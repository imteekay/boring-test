const { promises } = require('fs');
const Parser = require('@babel/parser');
const Traverser = require('@babel/traverse');

const generateAST = async (filePath) => {
  const fileContent = await promises.readFile(filePath, 'utf8');

  return Parser.parse(fileContent, {
    sourceType: 'module',
    plugins: ['jsx']
  });
};

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

const getPath = async (filePath) => {
  const ast = await generateAST(filePath);
  const { componentsNames, importsPaths } = getComponentsAndImports(ast);

  const components = componentsNames.reduce((acc, name) => {
    const path = importsPaths[name];

    if (path) {
      return {
        ...acc,
        [name]: path
      };
    }

    return acc;
  }, {});

  return components;
};

const getComponentsFilePaths = async (filePath) => {
  try {
    return await getPath(filePath);
  } catch (error) {
    const errorMessage = `Error: ${error}`;
    console.log(errorMessage);
    return errorMessage;
  }
}

exports.getComponentsFilePaths = getComponentsFilePaths;
