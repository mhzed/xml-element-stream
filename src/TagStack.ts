import * as sax from 'sax';
import * as EventEmitter from "events";
import {Element} from "./Element";

export class TagStack extends EventEmitter {
  private stack : Array<Element> = [];
  private emitTagStack : Array<String> = [];

  private top() : Element {
    return this.stack[this.stack.length-1];
  }
  private topEmitTag() : String {
    return this.emitTagStack[this.emitTagStack.length-1];
  }

  private isStacking() : boolean {
    return this.stack.length > 0;
  }

  public enterTag(tag: sax.Tag) : void {
    if (this.isStacking()) {
      this.stack.push(new Element(tag));
    }
  }
  public exitTag(tagname: String) : void {
    if (this.isStacking()) {
      let e : Element = this.stack.pop();
      if (e.tag.name == this.topEmitTag()) {
        this.emit("element", e);
        this.emitTagStack.pop();
      }

      if (this.isStacking()) {
        let parent: Element = this.top();
        parent.children.push(e);
      }
    }
  }

  public enterAndPushTag(tag: sax.Tag) : void {
    this.stack.push(new Element(tag));
    this.emitTagStack.push(tag.name);
  }
}