xml-element-stream
--------

A wrapper around saxjs to parse large xml file in stream mode:

1. Javascript only
2. Very fast in nodejs

### Usage

      import {Element, ElementStream} from "xml-element-stream";
      import * as fs from 'fs';
      import * as path from 'path';

      let wikistream = ElementStream.create({});
      // Spit out page element when </page> is encountered
      wikistream.registerTag("page");
    
      fs.createReadStream(path.join(__dirname, "test.wikidump.xml"))
          .pipe(wikistream)
          .on('data', (e: Element)=>{
            console.log(e.tag.name);    // all "page"
            e.children;   // array of children embeded in page element
          })
          .on('end', ()=>{
            // stream finished  
          })