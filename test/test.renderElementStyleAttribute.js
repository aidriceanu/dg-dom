var expect = require("chai").expect;
var dg = require("../dom.js");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const {window} = new JSDOM(`<!DOCTYPE html>`);
const {document} = window;

describe("Test.renderElementStyleAttribute", function() {
    it("Check you can set style using string: {style: 'color:red;'}", function(){
        let element = document.createElement("a");
        modifiedElement = dg.renderElementStyleAttribute(element, "color: red;");
        expect(modifiedElement.style).to.have.property("color");
        expect(modifiedElement.style.color).to.be.equal("red");
    });

    it("Check you can set style using object: {style: {'color': 'red'}}", function(){
        let element = document.createElement("a");
        modifiedElement = dg.renderElementStyleAttribute(element, {"color": "red"});
        expect(modifiedElement.style).to.have.property("color");
        expect(modifiedElement.style.color).to.be.equal("red");
    });

    describe("Check you can set style using function: {style: function}", function () {
        it("Check for function returning a object", function(){
            let element = document.createElement("a");
            modifiedElement = dg.renderElementStyleAttribute(element, () => {return {"color": "red"};});
            expect(modifiedElement.style).to.have.property("color");
            expect(modifiedElement.style.color).to.be.equal("red");
        });

        it("Check for function returning a string", function(){
            let element = document.createElement("a");
            modifiedElement = dg.renderElementStyleAttribute(element, () => {return "color: red;";});
            expect(modifiedElement.style).to.have.property("color");
            expect(modifiedElement.style.color).to.be.equal("red");
        });

        it("Check for function returning a function", function(){
            let element = document.createElement("a");
            modifiedElement = dg.renderElementStyleAttribute(element, () => {return () => {return {"color": "red"};};});
            expect(modifiedElement.style).to.have.property("color");
            expect(modifiedElement.style.color).to.be.equal("red");
        });
    });

});