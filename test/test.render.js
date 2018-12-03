var expect = require("chai").expect;
var dg = require("../dom.js");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const {window} = new JSDOM(`<!DOCTYPE html>`);
const {document} = window;

describe("Test.render", function () {
    it("Test with element as Array", function () {
        let elements = dg.render(["a", {"class": "link alert", "href": "link-addr", "onclick": () => {return 1 + 1;}}, "text in link"]);

        expect(elements[0].tagName).to.be.equal("A");
        expect(elements[0].className).to.be.equal("link alert");
        expect(elements[0].getAttribute("href")).to.be.equal("link-addr");
        expect(elements[0].onclick()).to.be.equal(2);
        expect(elements[0].innerHTML).to.be.equal("text in link");
    });

    it("Test with element as String", function () {
        let elements = dg.render('<a class="link alert" href="link-addr" onclick="return 1 + 1;">text in link</a>');

        expect(elements[0].tagName).to.be.equal("A");
        expect(elements[0].className).to.be.equal("link alert");
        expect(elements[0].getAttribute("href")).to.be.equal("link-addr");
        expect(elements[0].getAttribute("onclick")).to.be.equal("return 1 + 1;");
        expect(elements[0].innerHTML).to.be.equal("text in link");
    });

    it("Test with element as Function", function () {
        let elements = dg.render(() => {
            return ["a", {"class": "link alert", "href": "link-addr", "onclick": () => {return 1 + 1;}}, "text in link"];
        });

        expect(elements[0].tagName).to.be.equal("A");
        expect(elements[0].className).to.be.equal("link alert");
        expect(elements[0].getAttribute("href")).to.be.equal("link-addr");
        expect(elements[0].onclick()).to.be.equal(2);
        expect(elements[0].innerHTML).to.be.equal("text in link");
    });

    it("Test with element as Object", function () {
        let elements = dg.render({"tagName": "a"});

        expect(elements.length).to.be.equal(0);
    });
});