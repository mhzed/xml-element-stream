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
    _write(chunk, encoding, callback) {
        this.saxParser.write(chunk);
        callback(this.parseError);
        this.parseError = null;
    }
    // unnecessary ReadStream override
    //_read(size) {}
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
            this.push(e);
        });
    }
}
exports.ElementStream = ElementStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWxlbWVudFN0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkVsZW1lbnRTdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBbUQ7QUFDbkQsMkJBQTJCO0FBQzNCLHlDQUFvQztBQUdwQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFNcEIsbUJBQTJCLFNBQVEsa0JBQVM7SUFpQjFDLFlBQW9CLE9BQWU7UUFDakMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBZlQsWUFBTyxHQUFZLEVBQUUsQ0FBQztRQWdCNUIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFmRCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQTZCO1FBQ3pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUMzQixPQUFPLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLENBQUUsOEJBQThCO1FBQ2xFLElBQUksR0FBRyxHQUFHLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFPRCxXQUFXLENBQUMsR0FBWTtRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUN6QyxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUTtRQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxrQ0FBa0M7SUFDbEMsZ0JBQWdCO0lBRVIsWUFBWTtRQUNsQixJQUFJLEtBQUssR0FBRyxJQUFJLG1CQUFRLEVBQUUsQ0FBQztRQUUzQixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2xDLElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLEtBQVk7WUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQyxDQUFBO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFZO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QixDQUFDO1FBQ0gsQ0FBQyxDQUFBO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxPQUFlO1lBQzFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekIsQ0FBQyxDQUFBO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFZO1lBQ25DLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsQ0FBQyxDQUFBO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxLQUFhO1lBQ3JDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFBO1FBRUQsS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFXO1lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQTtJQUVKLENBQUM7Q0FDRjtBQW5FRCxzQ0FtRUMifQ==