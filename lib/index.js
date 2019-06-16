#!/usr/bin/env node
"use strict";

var _minimist = _interopRequireDefault(require("minimist"));

var _core = require("./core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var args = (0, _minimist["default"])(process.argv.slice(2));
var template = args.t || args.template;
var command = args._[0] || args.f || args.file;

var handleGeneration = function handleGeneration() {
  return command === 'generate-templates' ? (0, _core.generateTemplates)() : (0, _core.generateTest)(template, command);
};

command ? handleGeneration() : console.log("Add a file as the -f argument");