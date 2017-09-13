"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const sax = require("sax");
const TagStack_1 = require("./TagStack");
const Strict = true;
class ElementStream extends stream_1.Transform {
    constructor(options) {
        super(options);
        this.tagsMap = {};
        this.elementQueue = [];
        this._setupParser();
    }
    static create(options) {
        if (!options)
            options = {};
        options.readableObjectMode = true; // on out, element is returned
        let ret = new ElementStream(options);
        if (options.tags) {
            for (let t of options.tags) {
                ret.registerTag(t);
            }
        }
        return ret;
    }
    registerTag(tag) {
        this.tagsMap[tag.toLowerCase()] = true;
    }
    // override
    _transform(chunk, encoding, callback) {
        this.saxParser.write(chunk);
        while (this.elementQueue.length > 0) {
            this.push(this.elementQueue.shift());
        }
        callback(this.parseError);
        this.parseError = null;
    }
    _setupParser() {
        let stack = new TagStack_1.TagStack();
        this.saxParser = sax.parser(Strict, {
            trim: true,
            xmlns: true
        });
        this.saxParser.onerror = (error) => {
            this.parseError = error;
        };
        this.saxParser.onopentag = (tag) => {
            if (this.tagsMap[tag.name.toLowerCase()]) {
                stack.enterAndPushTag(tag);
            }
            else {
                stack.enterTag(tag);
            }
        };
        this.saxParser.onclosetag = (tagname) => {
            stack.exitTag(tagname);
        };
        this.saxParser.ontext = (text) => {
            stack.addText(text);
        };
        this.saxParser.oncdata = (cdata) => {
            stack.addText(cdata);
        };
        stack.on('element', (e) => {
            this.elementQueue.push(e);
        });
    }
}
exports.ElementStream = ElementStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWxlbWVudFN0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkVsZW1lbnRTdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBbUQ7QUFDbkQsMkJBQTJCO0FBQzNCLHlDQUFvQztBQUdwQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFNcEIsbUJBQTJCLFNBQVEsa0JBQVM7SUFtQjFDLFlBQW9CLE9BQWU7UUFDakMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBakJULFlBQU8sR0FBWSxFQUFFLENBQUM7UUFFdEIsaUJBQVksR0FBb0IsRUFBRSxDQUFDO1FBZ0J6QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQWZELE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBNkI7UUFDekMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsQ0FBRSw4QkFBOEI7UUFDbEUsSUFBSSxHQUFHLEdBQUcsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDakIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQU9ELFdBQVcsQ0FBQyxHQUFZO1FBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxXQUFXO0lBQ1gsVUFBVSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUTtRQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFFTyxZQUFZO1FBQ2xCLElBQUksS0FBSyxHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBRTNCLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDbEMsSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBWTtZQUNwQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDLENBQUE7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQVk7WUFDdEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLENBQUM7UUFDSCxDQUFDLENBQUE7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxDQUFDLE9BQWU7WUFDMUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUE7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQVk7WUFDbkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUE7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLEtBQWE7WUFDckMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUE7UUFFRCxLQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQVc7WUFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0Y7QUFyRUQsc0NBcUVDIn0=