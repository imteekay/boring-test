const { dirname, resolve } = require('path');
const { promises } = require('fs');

const getComponent = (fileContent) =>
  fileContent
    .substring(fileContent.indexOf('<') + 1, fileContent.indexOf('/>'))
    .split('\n')[0];

const getRelativeFolderPath = ({ fileContent, component, componentImport, importString }) =>
  fileContent
    .substring(componentImport + importString.length, fileContent.indexOf(`${component}';`))
    .replace('.', '');

const getPath = async (filePath) => {
  const absoluteFilePath = await resolve(filePath);
  const fileContent = await promises.readFile(absoluteFilePath, 'utf8');

  const component = getComponent(fileContent)

  const importString = `import { ${component} } from '`;
  const componentImport = fileContent.indexOf(importString);

  const relativeFolderPath = getRelativeFolderPath({ fileContent, component, componentImport, importString });

  const innerComponentRelativePath = `${relativeFolderPath}${component}.js`;
  const componentPathFolderPath = dirname(filePath);

  return `${componentPathFolderPath}${innerComponentRelativePath}`;
};

const getComponentFilePath = async (filePath) => {
  try {
    return getPath(filePath);
  } catch (error) {
    const errorMessage = `Error: ${error}`;
    console.log(errorMessage);
    return errorMessage;
  }
}

exports.getComponentFilePath = getComponentFilePath;

// -----------------------------------------------------------------

const babelParser = require('@babel/parser');
const fs = require('fs');

const generateAST = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf8');

  return babelParser.parse(fileContent, {
    sourceType: 'module',
    plugins: ['jsx']
  });
};

const filePath = '/home/leandrokinoshita/projects/boring-test/mocks/Component.js';

const ast = generateAST(filePath);

console.log(JSON.stringify(ast, null, 2))

const ast = {
  "key1": {
    "key2": {
      "key3": {
        "value": "my value"
      }
    } 
  }
}

let deep = (tree) => {
  if (typeof tree == "string") return;

  const keys = Object.keys(tree);

  keys.forEach((key) => {
    console.log(tree[key])
    deep(tree[key]);
  });
};

deep(ast)