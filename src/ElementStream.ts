import {Transform} from 'stream';
import * as sax from 'sax';
import {TagStack} from './TagStack';
import {Element} from "./Element";

const Strict = true;

export class ElementStream extends Transform {
  private saxParser : sax.SAXParser;
  private parseError : Error;
  private tagsMap : Object = {};

  static create(options) : ElementStream {
    options.readableObjectMode = true;  // on out, element is returned
    return new ElementStream(options);
  }
  
  private constructor(options: object) {
    super(options);
    this._setupParser();
  }

  registerTag(tag : String) : void {
    this.tagsMap[tag.toLowerCase()] = true;
  }
  
  _write(chunk, encoding, callback) : void {
    this.saxParser.write(chunk);
    callback(this.parseError);
    this.parseError = null;
  }

  // unnecessary ReadStream override
  //_read(size) {}

  private _setupParser() : void {
    let stack = new TagStack();

    this.saxParser = sax.parser(Strict, {
      trim: true,
      xmlns: true
    });
    this.saxParser.onerror = (error: Error) => {
      this.parseError = error;
    }
    this.saxParser.onopentag = (tag: sax.Tag) => {
      if (this.tagsMap[tag.name.toLowerCase()]) {
        stack.enterAndPushTag(tag);
      } else {
        stack.enterTag(tag);
      }
      if (tag.isSelfClosing) {
        stack.exitTag(tag.name);
      }
    }
    this.saxParser.onclosetag = (tagname: string) => {
      stack.exitTag(tagname);
    }
    this.saxParser.ontext = (text: string) => {
      stack.addText(text);
    }
    
    stack.on('element', (e : Element) => {
      this.push(e);
    })
    
  }
}