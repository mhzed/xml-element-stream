import * as sax from 'sax';

export class Element {
  public tag : sax.Tag;
  public children : Array<Element> = [];

  constructor(tag : sax.Tag) {
    this.tag = tag;
  }
}
