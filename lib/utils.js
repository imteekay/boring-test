"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.excludeLast = exports.getSecondElement = exports.getFirstElement = exports.getLastElement = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getLastIndex = function getLastIndex(list) {
  return list.length - 1;
};

var getLastElement = function getLastElement(list) {
  var lastIndex = getLastIndex(list);
  return list[lastIndex];
};

exports.getLastElement = getLastElement;

var getFirstElement = function getFirstElement(list) {
  return list[0];
};

exports.getFirstElement = getFirstElement;

var getSecondElement = function getSecondElement(list) {
  return list[1];
};

exports.getSecondElement = getSecondElement;

var excludeLast = function excludeLast(list) {
  var lastIndex = getLastIndex(list);
  return _toConsumableArray(list.slice(0, lastIndex));
};

exports.excludeLast = excludeLast;