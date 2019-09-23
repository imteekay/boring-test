const { dirname, resolve, relative } = require('path')
const { readFile } = require('fs')

const { getPropTypes } = require('./getPropTypes');

// const filePath = '/Users/leandrotk/projects/boring-test/mocks/Component.js';
const filePath = '/home/leandrokinoshita/projects/boring-test/mocks/Component.js';
const path = resolve(dirname, filePath);

const getComponentFilePath = (error, data) => {
  if (error) {
    const errorMessage = `Error: ${error}`;
    console.log(errorMessage);
    return errorMessage;
  }

  const component = data.substring(
    data.indexOf('<') + 1,
    data.indexOf('/>')
  ).split('\n')[0];

  const importString = `import { ${component} } from '`;
  const componentImport = data.indexOf(importString);

  const relativeFolders = data.substring(
    componentImport + importString.length,
    data.indexOf(`${component}';`)
  ).replace('.', '');

  const innerComponentRelativePath = `${relativeFolders}${component}.js`;
  const componentPathFolderPath = dirname(filePath);

  getPropTypes(`${componentPathFolderPath}${innerComponentRelativePath}`);
};

readFile(path, 'utf8', getComponentFilePath);
