import {Transform, TransformOptions} from 'stream';
import * as sax from 'sax';
import {TagStack} from './TagStack';
import {Element} from "./Element";

const Strict = true;

export interface ElementStreamOption extends TransformOptions {
  tags?: Array<string>
}

export class ElementStream extends Transform {
  private saxParser : sax.SAXParser;
  private parseError : Error;
  private tagsMap : Object = {};

  static create(options?: ElementStreamOption) : ElementStream {
    if (!options) options = {};
    options.readableObjectMode = true;  // on out, element is returned
    let ret = new ElementStream(options);
    if (options.tags) {
      for (let t of options.tags) {
        ret.registerTag(t);
      }
    }
    return ret;
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
    }
    this.saxParser.onclosetag = (tagname: string) => {
      stack.exitTag(tagname);
    }
    this.saxParser.ontext = (text: string) => {
      stack.addText(text);
    }
    this.saxParser.oncdata = (cdata: string) => {
      stack.addText(cdata);
    }
    
    stack.on('element', (e : Element) => {
      this.push(e);
    })
    
  }
}