#!/usr/bin/env node

import minimist from "minimist";
import { generateTest } from "./core";

const args = minimist(process.argv.slice(2));

const template = args.t || args.template;
const file = args._[0] || args.f || args.file;

file
  ? generateTest(template, file)
  : console.log("Add a file as the -f argument");
