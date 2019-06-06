#!/usr/bin/env node

import minimist from "minimist";
import { generateTest } from "./core";

const args = minimist(process.argv.slice(2));

const template = args.t;
const file = args.f;

file
  ? generateTest(template, file)
  : console.log("Add a file as the -f argument");
