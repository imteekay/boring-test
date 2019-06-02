import { readFileSync, writeFile } from "fs";
import minimist from "minimist";
import mkdirp from "mkdirp";
import { dirname } from "path";

import {
  getTemplateFile,
  getComponentName,
  componentReplacement
} from "./src/read.js";

import { callback, getTestPath } from "./src/write.js";

const args = minimist(process.argv.slice(2));

const template = args.t;
const file = args.f;

const componentName = getComponentName(file);
const templateFile = getTemplateFile(template);

const content = readFileSync(templateFile, "utf8");

const newTest = componentReplacement(content, componentName);
const newTestPath = getTestPath(file);

mkdirp(dirname(newTestPath), err => {
  if (err) return cb(err);

  writeFile(newTestPath, newTest, callback);
});
