var expect = require("chai").expect;
var dg = require("../dom.js");
const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const {window} = new JSDOM(`<!DOCTYPE html>`);
const {document} = window;