var expect = require("chai").expect;
var dg = require("../index.js");

describe("String.ucfirst", function() {
    var testValues = {
        "Atest": "Atest",
        "atest": "Atest",
        "!test": "!test"
    };

    for (str in  testValues) {
        it("'" + str + "'.ucfirst is equal to " + testValues[str], function() {
            expect(testValues[str]).to.be.equal(str.ucfirst());
        });
    }
});