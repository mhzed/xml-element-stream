"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../");
const fs = require("fs");
const path = require("path");
const through2 = require("through2");
exports.testwikidump = (test) => {
    let srcstream = fs.createReadStream(path.join(__dirname, "test.wikidump.xml"));
    let wikistream = new _1.ElementStream({});
    wikistream.registerTag("page");
    wikistream.registerTag("title");
    srcstream.pipe(wikistream).pipe(through2.obj(() => {
    }));
    test.done();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC14bWwtZWxlbWVudC1zdHJlYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZXN0LXhtbC1lbGVtZW50LXN0cmVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBCQUEyQztBQUMzQyx5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLHFDQUFxQztBQUVyQyxPQUFPLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSTtJQUMxQixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLG1CQUFtQixDQUFDLENBQzVDLENBQUM7SUFHRixJQUFJLFVBQVUsR0FBRyxJQUFJLGdCQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdkMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQixVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRWhDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7SUFFN0MsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNILElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNkLENBQUMsQ0FBQSJ9