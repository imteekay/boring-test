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

const Parser = require('@babel/parser');
const Traverser = require('@babel/traverse');
const fs = require('fs');

const generateAST = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf8');

  return Parser.parse(fileContent, {
    sourceType: 'module',
    plugins: ['jsx']
  });
};

// const filePath = '/home/leandrokinoshita/projects/boring-test/mocks/Component2.js';
const filePath = '/Users/leandrotk/projects/boring-test/mocks/Component2.js';

const ast = generateAST(filePath);

const addComponentName = (componentsNames) => (path) => {
  const jsx = path.node;
  const componentName = jsx.name.name;

  componentsNames.push(componentName);
}

const addImportPath = (importsPaths) => (path) => {
  const node = path.node;
  const componentName = node.specifiers[0].local.name;
  const componentPath = node.source.value;

  importsPaths[componentName] = componentPath;
}

const getComponentsAndImports = (ast) => {
  const componentsNames = [];
  const importsPaths = {};

  Traverser.default(ast, {
    JSXOpeningElement: addComponentName(componentsNames),
    ImportDeclaration: addImportPath(importsPaths)
  });

  return {
    componentsNames,
    importsPaths
  };
};

const { componentsNames, importsPaths } = getComponentsAndImports(ast);

componentsNames.forEach((name) => console.log(name, importsPaths[name]));
