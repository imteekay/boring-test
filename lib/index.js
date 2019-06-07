#!/usr/bin/env node
"use strict";

var _minimist = _interopRequireDefault(require("minimist"));

var _core = require("./core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var args = (0, _minimist["default"])(process.argv.slice(2));
var template = args.t || args.template;
var file = args.f || args.file;
file ? (0, _core.generateTest)(template, file) : console.log("Add a file as the -f argument");