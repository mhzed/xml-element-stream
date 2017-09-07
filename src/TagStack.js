"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = require("events");
const Element_1 = require("./Element");
class TagStack extends EventEmitter {
    constructor() {
        super(...arguments);
        this.stack = [];
        this.emitTagStack = [];
    }
    top() {
        return this.stack[this.stack.length - 1];
    }
    topEmitTag() {
        return this.emitTagStack[this.emitTagStack.length - 1];
    }
    isStacking() {
        return this.stack.length > 0;
    }
    enterTag(tag) {
        if (this.isStacking()) {
            this.stack.push(new Element_1.Element(tag));
        }
    }
    exitTag(tagname) {
        if (this.isStacking()) {
            let e = this.stack.pop();
            if (e.tag.name == this.topEmitTag()) {
                this.emit("element", e);
                this.emitTagStack.pop();
            }
            if (this.isStacking()) {
                let parent = this.top();
                parent.children.push(e);
            }
        }
    }
    enterAndPushTag(tag) {
        this.stack.push(new Element_1.Element(tag));
        this.emitTagStack.push(tag.name);
    }
}
exports.TagStack = TagStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFnU3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJUYWdTdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHVDQUF1QztBQUN2Qyx1Q0FBa0M7QUFFbEMsY0FBc0IsU0FBUSxZQUFZO0lBQTFDOztRQUNVLFVBQUssR0FBb0IsRUFBRSxDQUFDO1FBQzVCLGlCQUFZLEdBQW1CLEVBQUUsQ0FBQztJQXFDNUMsQ0FBQztJQW5DUyxHQUFHO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUNPLFVBQVU7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVPLFVBQVU7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRU0sUUFBUSxDQUFDLEdBQVk7UUFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNwQyxDQUFDO0lBQ0gsQ0FBQztJQUNNLE9BQU8sQ0FBQyxPQUFlO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLEdBQWEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNuQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUMxQixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxNQUFNLEdBQVksSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNqQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFTSxlQUFlLENBQUMsR0FBWTtRQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztDQUNGO0FBdkNELDRCQXVDQyJ9