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
        .on('error', (err) => {
        test.ifError(err);
        test.done();
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
    let estream = _1.ElementStream.create({ tags: ['p'] });
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