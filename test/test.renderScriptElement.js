var expect = require("chai").expect;
var dg = require("../dom.js");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const {window} = new JSDOM(`<!DOCTYPE html>`);
const {document} = window;

describe("Test.renderScriptElement", function () {
    it("Test render with attributes and content", function () {
        let testData = [{type: "text/javascript"}, "let a = 1 + 1;"];
        let element = dg.renderScriptElement(document.createElement('script'), testData);

        expect(element.getAttribute("type")).to.equal("text/javascript");
        expect(element.innerHTML).to.equal("let a = 1 + 1;");
    });
});