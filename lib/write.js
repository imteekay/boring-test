"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTestPath = exports.callback = exports.templateCallbak = void 0;

var _utils = require("./utils.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var TESTS = "tests";
var TEST = "test";

var templateCallbak = function templateCallbak(file) {
  return function (e) {
    if (e) throw e;
    console.log("Created ".concat(file, " template! \uD83D\uDE0E"));
  };
};

exports.templateCallbak = templateCallbak;

var callback = function callback(e) {
  if (e) throw e;
  console.log("Created! 😎");
};

exports.callback = callback;

var getTestFileName = function getTestFileName(fileName) {
  var fileNameList = fileName.split(".");
  var componentName = (0, _utils.getFirstElement)(fileNameList);
  var fileExtension = (0, _utils.getSecondElement)(fileNameList);
  return [componentName, TEST, fileExtension].join(".");
};

var getTestPath = function getTestPath(file) {
  var fileList = file.split("/");
  var fileName = (0, _utils.getLastElement)(fileList);
  var testFileName = getTestFileName(fileName);
  var folders = (0, _utils.excludeLast)(fileList);
  return [].concat(_toConsumableArray(folders), [TESTS, testFileName]).join("/");
};

exports.getTestPath = getTestPath;