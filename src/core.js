import mkdirp from "mkdirp";
import { promises as fs } from "fs";
import { dirname, resolve } from "path";

import {
  getTemplateFile,
  getComponentName,
  componentReplacement
} from "./read.js";

import { templateCreationCallback, testCreationCallback, getTestPath } from "./write.js";

const generateTemplates = async () => {
  const templatesFiles = resolve(__dirname, '../templates');
  const templates = await fs.readdir(templatesFiles);

  templates.forEach(async (file) => {
    const templatePath = resolve(__dirname, `../templates/${file}`);
    const content = await fs.readFile(templatePath, "utf8");

    const error = await fs.mkdir(dirname(`templates/${file}`));

    if (error) {
      console.log(`Error on template file creation: ${error}`);
      return;
    }

    templateCreationCallback(file)(await fs.writeFile(`templates/${file}`, content));
  });
};

const generateTest = async (template, file) => {
  const componentName = getComponentName(file);
  const templateFile = getTemplateFile(template);

  const templatePath = resolve(__dirname, `../${templateFile}`);
  const content = await fs.readFile(templatePath, "utf8");

  const newTest = componentReplacement(content, componentName);
  const newTestPath = getTestPath(file);

  const error = await fs.mkdir(dirname(newTestPath));

  if (error) {
    console.log(`Error on test file creation: ${error}`);
    return;
  }

  testCreationCallback(await fs.writeFile(newTestPath, newTest));
};

export { generateTemplates, generateTest };
