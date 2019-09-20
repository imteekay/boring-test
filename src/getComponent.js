const { dirname, resolve } = require('path')
const { readFile } = require('fs')

const filePath = '/Users/leandrotk/projects/boring-test/mocks/Component.js';
const path = resolve(dirname, filePath);

const getComponentFile = (error, data) => {
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

  console.log(`${relativeFolders}${component}.js`);
};

readFile(path, 'utf8', getComponentFile);
