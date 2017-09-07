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
        options.readableObjectMode = true; // on out, element is returned
        return new ElementStream(options);
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
            if (tag.isSelfClosing) {
                stack.exitTag(tag.name);
            }
        };
        this.saxParser.onclosetag = (tagname) => {
            stack.exitTag(tagname);
        };
        this.saxParser.ontext = (text) => {
            stack.addText(text);
        };
        stack.on('element', (e) => {
            this.push(e);
        });
    }
}
exports.ElementStream = ElementStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWxlbWVudFN0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkVsZW1lbnRTdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBaUM7QUFDakMsMkJBQTJCO0FBQzNCLHlDQUFvQztBQUdwQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFFcEIsbUJBQTJCLFNBQVEsa0JBQVM7SUFVMUMsWUFBb0IsT0FBZTtRQUNqQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFSVCxZQUFPLEdBQVksRUFBRSxDQUFDO1FBUzVCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBUkQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPO1FBQ25CLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsQ0FBRSw4QkFBOEI7UUFDbEUsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFPRCxXQUFXLENBQUMsR0FBWTtRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUN6QyxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUTtRQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxrQ0FBa0M7SUFDbEMsZ0JBQWdCO0lBRVIsWUFBWTtRQUNsQixJQUFJLEtBQUssR0FBRyxJQUFJLG1CQUFRLEVBQUUsQ0FBQztRQUUzQixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2xDLElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLEtBQVk7WUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQyxDQUFBO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFZO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFCLENBQUM7UUFDSCxDQUFDLENBQUE7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxDQUFDLE9BQWU7WUFDMUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUE7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQVk7WUFDbkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUE7UUFFRCxLQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQVc7WUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFBO0lBRUosQ0FBQztDQUNGO0FBNURELHNDQTREQyJ9