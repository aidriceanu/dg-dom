var expect = require("chai").expect;
var dg = require("../dom.js");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const {window} = new JSDOM(`<!DOCTYPE html>`);
const {document} = window;

describe("Test.renderScriptElementChildren", function () {
    it("Test if content is a Function", function () {
       let element = dg.renderScriptElementChildren(document.createElement('script'), function () {
           return 1 + 1;
       });

       expect(dg.dgDomScriptFunctions.length).to.equal(1);
       expect(dg.dgDomScriptFunctions[0]()).to.equal(2);
       expect(element.innerHTML).to.eql('(dgDomScriptFunctions[0])();');
    });

    it("Test if content is a String", function () {
        let element = dg.renderScriptElementChildren(document.createElement('script'), 'let a = 1 + 1;');

        expect(element.innerHTML).to.eql('let a = 1 + 1;');
    });
});