import {
  readdirSync,
  readFileSync,
  writeFile
} from "fs";

import mkdirp from "mkdirp";
import { dirname, resolve } from "path";

import {
  getTemplateFile,
  getComponentName,
  componentReplacement
} from "./read.js";

import { templateCallbak, callback, getTestPath } from "./write.js";

const generateTemplates = () => {
  const templates = resolve(__dirname, '../templates');

  readdirSync(templates).forEach(file => {
    const templatePath = resolve(__dirname, `../templates/${file}`);
    const content = readFileSync(templatePath, "utf8");

    mkdirp(dirname(`templates/${file}`), err => {
      if (err) return cb(err);

      writeFile(`templates/${file}`, content, templateCallbak(file));
    });
  });
};

const generateTest = (template, file) => {
  const componentName = getComponentName(file);
  const templateFile = getTemplateFile(template);

  const templatePath = resolve(__dirname, `../${templateFile}`);
  const content = readFileSync(templatePath, "utf8");

  const newTest = componentReplacement(content, componentName);
  const newTestPath = getTestPath(file);

  mkdirp(dirname(newTestPath), err => {
    if (err) return cb(err);

    writeFile(newTestPath, newTest, callback);
  });
};

export { generateTemplates, generateTest };
