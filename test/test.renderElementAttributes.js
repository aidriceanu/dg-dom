var expect = require("chai").expect;
var dg = require("../dom.js");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const {window} = new JSDOM(`<!DOCTYPE html>`);
const {document} = window;

describe("Test.renderElementAttributes", function() {
    it("Test adding a class attribute", function () {
        let element = document.createElement("a");
        modifiedElement = dg.renderElementAttributes(element, {"class": "visible"});
        expect(modifiedElement.className).to.be.equal("visible");
    });

    it("Test adding a style attribute", function () {
        let element = document.createElement("a");
        modifiedElement = dg.renderElementAttributes(element, {"style": "color: red;"});
        expect(modifiedElement.style).to.have.property("color");
        expect(modifiedElement.style.color).to.be.equal("red");
    });

    it("Test adding a event", function () {
        let element = document.createElement("a");
        modifiedElement = dg.renderElementAttributes(element, {"onclick": () => {return 1 + 1;}});
        expect(modifiedElement.onclick).to.be.a('function');
        expect(modifiedElement.onclick()).to.be.equal(2);
    });

    it("Test adding a custom attribute", function () {
        let element = document.createElement("a");
        modifiedElement = dg.renderElementAttributes(element, {"data": "some-data"});
        expect(modifiedElement.getAttribute('data')).to.be.equal("some-data");
    });
});