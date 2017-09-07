"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../");
const fs = require("fs");
const path = require("path");
const stream = require("stream");
const inChildren = (e, children) => {
    for (let c of children) {
        if (c == e)
            return true;
    }
    return false;
};
exports.testwikidump = (test) => {
    let srcstream = fs.createReadStream(path.join(__dirname, "test.wikidump.xml"));
    let wikistream = _1.ElementStream.create({});
    wikistream.registerTag("page");
    wikistream.registerTag("title");
    let pageCnt = 0;
    let titleCnt = 0;
    let lastTitle;
    srcstream.pipe(wikistream)
        .on('data', (e) => {
        if (e.tag.name == 'page') {
            pageCnt++;
            test.equals(inChildren(lastTitle, e.children), true, "Title is in page");
            test.equals(e.findFirstDescendant("text") !== null, true, "found text element");
        }
        else if (e.tag.name == 'title') {
            titleCnt++;
            lastTitle = e;
        }
    })
        .on('end', () => {
        test.equals(pageCnt, 79, "Expect 79 pages discovered");
        test.equals(pageCnt, titleCnt, "Same number of page and titles");
        test.done();
    });
};
exports.testcdata = (test) => {
    class SrcStream extends stream.Readable {
        constructor(content) {
            super();
            setTimeout(() => {
                this.push(content);
                this.push(null);
            }, 1);
        }
        _read(size) { }
    }
    let estream = _1.ElementStream.create({});
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
        .on('data', (e) => {
        switch (++c) {
            case 1:
                test.equals(e.text, "paragraph 1 abc", "equal");
                break;
            case 2:
                test.equals(e.text, "paragraph 2 <p>", "equal");
                break;
            case 3:
                test.equals(e.text, "paragraph 3", "equal");
                break;
        }
    })
        .on('end', () => {
        test.done();
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC14bWwtZWxlbWVudC1zdHJlYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZXN0LXhtbC1lbGVtZW50LXN0cmVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBCQUEyQztBQUMzQyx5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLGlDQUFpQztBQUdqQyxNQUFNLFVBQVUsR0FBRyxDQUFDLENBQVUsRUFBRSxRQUF3QjtJQUN0RCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFBO0FBRUQsT0FBTyxDQUFDLFlBQVksR0FBRyxDQUFDLElBQW9CO0lBQzFDLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsQ0FDNUMsQ0FBQztJQUVGLElBQUksVUFBVSxHQUFHLGdCQUFhLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVoQyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDaEIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLElBQUksU0FBbUIsQ0FBQztJQUN4QixTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUNyQixFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBVTtRQUNyQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3pC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