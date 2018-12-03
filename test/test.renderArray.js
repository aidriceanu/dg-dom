var expect = require("chai").expect;
var dg = require("../dom.js");

describe("Test.renderArray", function () {
    it("Test with single element", function () {
        var elements = dg.renderArray(['a']);

        expect(elements.length).to.be.equal(1);
    });

    it("Test with element list", function () {
        var elements = dg.renderArray([['a'], ['a'], ['a']]);

        expect(elements.length).to.be.equal(3);
    });
});