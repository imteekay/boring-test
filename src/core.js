import fs from "fs";
import util from 'util';
import mkdirp from "mkdirp";
import { dirname, resolve } from "path";

import {
  getTemplateFile,
  getComponentName,
  componentReplacement
} from "./read.js";

import { templateCallbak, callback, getTestPath } from "./write.js";

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

const generateTemplates = async () => {
  const templatesFiles = resolve(__dirname, '../templates');
  const templates = await readdir(templatesFiles);

  templates.forEach(async (file) => {
    const templatePath = resolve(__dirname, `../templates/${file}`);
    const content = await readFile(templatePath, "utf8");

    mkdirp(dirname(`templates/${file}`), err => {
      if (err) return cb(err);

      fs.writeFile(`templates/${file}`, content, templateCallbak(file));
    });
  });
};

const generateTest = async (template, file) => {
  const componentName = getComponentName(file);
  const templateFile = getTemplateFile(template);

  const templatePath = resolve(__dirname, `../${templateFile}`);
  const content = await readFile(templatePath, "utf8");

  const newTest = componentReplacement(content, componentName);
  const newTestPath = getTestPath(file);

  mkdirp(dirname(newTestPath), err => {
    if (err) return cb(err);

    fs.writeFile(newTestPath, newTest, callback);
  });
};

export { generateTemplates, generateTest };
