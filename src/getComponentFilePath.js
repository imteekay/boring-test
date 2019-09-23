const { dirname, resolve } = require('path');
const { promises } = require('fs');

const { getComponentPropTypes } = require('./getComponentPropTypes');

const getComponent = (fileContent) =>
  fileContent
    .substring(fileContent.indexOf('<') + 1, fileContent.indexOf('/>'))
    .split('\n')[0];

const getRelativeFolderPath = ({ fileContent, component, componentImport, importString }) =>
  fileContent
    .substring(componentImport + importString.length, fileContent.indexOf(`${component}';`))
    .replace('.', '');

const getPath = (fileContent) => {
  const component = getComponent(fileContent)

  const importString = `import { ${component} } from '`;
  const componentImport = fileContent.indexOf(importString);

  const relativeFolderPath = getRelativeFolderPath({ fileContent, component, componentImport, importString });

  const innerComponentRelativePath = `${relativeFolderPath}${component}.js`;
  const componentPathFolderPath = dirname(filePath);

  const componentFilePath = getComponentPropTypes(`${componentPathFolderPath}${innerComponentRelativePath}`);

  return componentFilePath;
};

const getComponentFilePath = async (absoluteFilePath) => {
  try {
    const fileContent = await promises.readFile(absoluteFilePath, 'utf8');
    return getPath(fileContent);
  } catch (error) {
    const errorMessage = `Error: ${error}`;
    console.log(errorMessage);
    return errorMessage;
  }
}

exports.getComponentFilePath = getComponentFilePath;

// const filePath = '/Users/leandrotk/projects/boring-test/mocks/Component.js';
const filePath = '/home/leandrokinoshita/projects/boring-test/mocks/Component.js';
const absoluteFilePath = resolve(dirname, filePath);
const result = getComponentFilePath(absoluteFilePath);
console.log(result);