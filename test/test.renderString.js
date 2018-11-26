var expect = require("chai").expect;
var dg = require("../dom.js");

describe("Test.renderElementStyleAttribute", function () {
    it("Check if you can create a element", function(){
        let elementString = "<a></a>";
        elements = dg.renderString(elementString);
        expect(elements).to.be.an('array');
        expect(elements.length).to.eql(1);
    });

    it("Check if you can create elements", function(){
        let elementString = "<p>1</p><p>2</p>";
        elements = dg.renderString(elementString);
        expect(elements).to.be.an('array');
        expect(elements.length).to.eql(2);
    });

    it("Check if you can create element with children", function(){
        let elementString = "<p><a></a></p>";
        elements = dg.renderString(elementString);

        expect(elements).to.be.an('array');
        expect(elements.length).to.eql(1);

        element = elements[0];
        children = Array.prototype.slice.call(element.childNodes);

        expect(children.length).to.eql(1);

        child = children[0];

        expect(child.tagName).to.eql('A');
    });

    it("Check if you can create element with attributes", function(){
        let elementString = "<p class='test' style='color: red;'></p>";
        elements = dg.renderString(elementString);

        expect(elements).to.be.an('array');
        expect(elements.length).to.eql(1);

        element = elements[0];

        expect(element.getAttribute("class")).to.eql('test');
        expect(element.style.color).to.eql('red');
    });
});