"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.componentReplacement = exports.getComponentName = exports.getTemplateFile = void 0;

var _utils = require("./utils");

var getTemplateFile = function getTemplateFile(template) {
  switch (template) {
    case "css":
      return "templates/css.js";

    default:
      return "";
  }
};

exports.getTemplateFile = getTemplateFile;

var getComponentName = function getComponentName(file) {
  var fileList = file.split("/");
  var fileName = (0, _utils.getLastElement)(fileList);
  var componentName = (0, _utils.getFirstElement)(fileName.split("."));
  return componentName;
};

exports.getComponentName = getComponentName;

var componentReplacement = function componentReplacement(content, componentName) {
  return content.split("${componentToBeTested}").join(componentName);
};

exports.componentReplacement = componentReplacement;