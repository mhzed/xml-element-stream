import {Element, ElementStream} from "../";
import * as fs from 'fs';
import * as path from 'path';
import * as stream from "stream";
import * as nodeunit from "nodeunit";

const inChildren = (e: Element, children: Array<Element>) : boolean => {
  for (let c of children) {
    if (c == e) return true;
  }
  return false;
}

exports.testwikidump = (test : nodeunit.Test) => {
  let srcstream = fs.createReadStream(
      path.join(__dirname, "test.wikidump.xml")
  );
  
  let wikistream = ElementStream.create({});
  wikistream.registerTag("page");
  wikistream.registerTag("title");

  let pageCnt = 0;
  let titleCnt = 0;
  let lastTitle : Element;
  srcstream.pipe(wikistream)
      .on('data', (e: Element)=>{
        if (e.tag.name == 'page') {
          pageCnt ++;
          test.equals(inChildren(lastTitle, e.children), true, "Title is in page");
        } else if (e.tag.name == 'title') {
          titleCnt ++;
          lastTitle = e;
        }
      })
      .on('end', ()=>{
        test.equals(pageCnt, 79, "Expect 79 pages discovered");
        test.equals(pageCnt, titleCnt, "Same number of page and titles");
        test.done();  
      })
}

exports.testcdata = (test:nodeunit.Test)=> {
  class SrcStream extends stream.Readable {
    constructor(content: string) {
      super();
      setTimeout(()=>{
        this.push(content);
        this.push(null);
      }, 1);
    }
    _read(size:number) {}
  }

  let estream = ElementStream.create({});
  estream.registerTag('p');
  
  let c = 0;
  (new SrcStream(`
  <root>
    <p><![CDATA[paragraph 1 ]]>abc</p>
    <p><![CDATA[paragraph 2 <p>]]></p>
    <p><![CDATA[paragraph 3]]></p>
  </root>
  `))
      .pipe(estream)
      .on('data', (e: Element)=>{
        switch (++c) {
          case 1: test.equals(e.text, "paragraph 1 abc", "equal"); break;
          case 2: test.equals(e.text, "paragraph 2 <p>", "equal"); break;
          case 3: test.equals(e.text, "paragraph 3", "equal"); break;
        }
      })
      .on('end', ()=>{
        test.done();
      })
  
}