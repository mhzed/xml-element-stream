import * as sax from 'sax';

export class Element {
  public tag : sax.Tag;
  public children : Array<Element> = [];
  public text : string;

  constructor(tag : sax.Tag) {
    this.tag = tag;
  }
  
  addText(t : string) :void {
    if (this.text == null) this.text = '';
    this.text = this.text.concat(t);
  }
  
  findChild(tagname: string) : Element | null {
    for (let c of this.children) {
      if (c.tag.name == tagname) return c;
    }
    return null;
  }
  
  // depth first search for first descendant with tag
  findFirstDescendant(tagname: string) : Element | null {
    for (let c of this.children) {
      if (c.tag.name == tagname) return c;
      else if (c.children.length > 0) {
        let res = c.findFirstDescendant(tagname);
        if (res) return res;
      }
    }
    return null;
  }
  
}
