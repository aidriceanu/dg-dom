var expect = require("chai").expect;
var dg = require("../dom.js");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const {window} = new JSDOM(`<!DOCTYPE html>`);
const {document} = window;

describe("Test.renderElement", function() {
    it("Render script element", function () {
        dg.resetGlobals();
        var data = [
            {"type": "text/javascript"},
            function () { return 1 + 1; }
            ];
        let element = dg.renderElement(document.createElement('script'), data);

        let globals = dg.getGlogals();

        expect(globals.dgDomScriptFunctions.length).to.equal(1);
        expect(globals.dgDomScriptFunctions[0]()).to.equal(2);
        expect(element.innerHTML).to.eql('(dgDomScriptFunctions[0])();');
        expect(element.getAttribute('type')).to.be.equal("text/javascript");
    });

    it("Render other element", function () {
        var data = [
            {"data": "paragraph-data"},
            ["span"]
        ];
        let element = dg.renderElement(document.createElement('p'), data);

        expect(Array.prototype.slice.call(element.childNodes).length).to.eql(1);
        expect(element.childNodes[0].tagName).to.equal("SPAN");
        expect(element.getAttribute('data')).to.be.equal("paragraph-data");
    })
});