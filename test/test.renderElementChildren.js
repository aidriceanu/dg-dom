var expect = require("chai").expect;
var dg = require("../dom.js");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const {window} = new JSDOM(`<!DOCTYPE html>`);
const {document} = window;

describe("Test.renderElementChildren", function () {
    it("Test multiple children list", function () {
        let element = dg.renderElementChildren(document.createElement('div'),[
            ['a'],
            "<a></a>",
            [
                ['a'],
                ['a'],
                "<a></a>"
            ]
        ]);

        expect(element.childNodes.length).to.be.equal(5);
    });

    it("Test with child as Array", function () {
        let element = dg.renderElementChildren(document.createElement('div'), ['a']);

        expect(element.childNodes.length).to.be.equal(1);
    });

    it("Test with child as String", function () {
        let element = dg.renderElementChildren(document.createElement('div'), "<a></a>");

        expect(element.childNodes.length).to.be.equal(1);
    });

    it("Test with child as Function", function () {
        let element = dg.renderElementChildren(document.createElement('div'), () => {
            return ['a'];
        });

        expect(element.childNodes.length).to.be.equal(1);
    });
});