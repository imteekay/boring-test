"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateTest = void 0;

var _fs = require("fs");

var _mkdirp = _interopRequireDefault(require("mkdirp"));

var _path = require("path");

var _read = require("./read.js");

var _write = require("./write.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var generateTest = function generateTest(template, file) {
  var componentName = (0, _read.getComponentName)(file);
  var templateFile = (0, _read.getTemplateFile)(template);
  var templatePath = (0, _path.resolve)(__dirname, "../".concat(templateFile));
  var content = (0, _fs.readFileSync)(templatePath, "utf8");
  var newTest = (0, _read.componentReplacement)(content, componentName);
  var newTestPath = (0, _write.getTestPath)(file);
  (0, _mkdirp["default"])((0, _path.dirname)(newTestPath), function (err) {
    if (err) return cb(err);
    (0, _fs.writeFile)(newTestPath, newTest, _write.callback);
  });
};

exports.generateTest = generateTest;