"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateTest = exports.generateTemplates = void 0;

var _fs = require("fs");

var _mkdirp = _interopRequireDefault(require("mkdirp"));

var _path = require("path");

var _read = require("./read.js");

var _write = require("./write.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var generateTemplates = function generateTemplates() {
  var templates = (0, _path.resolve)(__dirname, '../templates');
  (0, _fs.readdirSync)(templates).forEach(function (file) {
    var templatePath = (0, _path.resolve)(__dirname, "../templates/".concat(file));
    var content = (0, _fs.readFileSync)(templatePath, "utf8");
    (0, _mkdirp["default"])((0, _path.dirname)("templates/".concat(file)), function (err) {
      if (err) return cb(err);
      (0, _fs.writeFile)("templates/".concat(file), content, (0, _write.templateCallbak)(file));
    });
  });
};

exports.generateTemplates = generateTemplates;

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