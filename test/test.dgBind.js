var expect = require("chai").expect;
var dg = require("../index.js");

describe("Function.dgBind", function() {
    var func1 = (a, b) => {return a + b;};
    var func2 = function(a, b) {return a + b;};

    it("func1(1, 2) is equal to func1.dgBind(1)(2)", function(){
        expect(func1(1, 2)).to.be.equal(func1.dgBind(1)(2));
    });

    it("func2(1, 2) is equal to func2.dgBind(1)(2)", function(){
        expect(func2(1, 2)).to.be.equal(func2.dgBind(1)(2));
    });

    it("func1(1, 2) is equal to func2.dgBind(1)(2)", function(){
        expect(func1(1, 2)).to.be.equal(func2.dgBind(1)(2));
    });

    it("func2(1, 2) is equal to func1.dgBind(1)(2)", function(){
        expect(func1(1, 2)).to.be.equal(func2.dgBind(1)(2));
    });

    it("func1(2, 2) is not equal to func1.dgBind(1)(2)", function(){
        expect(func1(2, 2)).not.to.be.equal(func1.dgBind(1)(2));
    });

    it("func2(2, 2) is not equal to func2.dgBind(1)(2)", function(){
        expect(func2(2, 2)).not.to.be.equal(func2.dgBind(1)(2));
    });

    it("func1(2, 2) is not equal to func2.dgBind(1)(2)", function(){
        expect(func1(2, 2)).not.to.be.equal(func2.dgBind(1)(2));
    });

    it("func2(2, 2) is not equal to func1.dgBind(1)(2)", function(){
        expect(func1(2, 2)).not.to.be.equal(func2.dgBind(1)(2));
    });
})
