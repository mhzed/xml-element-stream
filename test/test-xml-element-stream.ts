import {Element, ElementStream} from "../";
import * as fs from 'fs';
import * as path from 'path';
import * as through2 from 'through2';

exports.testwikidump = (test) => {
  let srcstream = fs.createReadStream(
      path.join(__dirname, "test.wikidump.xml")
  );
  

  let wikistream = new ElementStream({});
  wikistream.registerTag("page");
  wikistream.registerTag("title");

  srcstream.pipe(wikistream).pipe(through2.obj(()=>{
    
  }))
  test.done();
}