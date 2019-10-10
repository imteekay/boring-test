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

const filePath = '/home/leandrokinoshita/projects/boring-test/mocks/Component2.js';

const ast = generateAST(filePath);

const reduceAstNode = (oldNode, currentNode) => {
  let element = {};

  if (currentNode.type === 'JSXElement') {
    element = {
      name: currentNode.openingElement.name.name,
      children: [],
    };

    oldNode.push(element);
  }

  if ('children' in currentNode) {
    currentNode.children.forEach(
      (node) =>
        oldNode.length > 0
          ? reduceAstNode(element.children, node)
          : reduceAstNode(oldNode, node),
    );
  }

  return oldNode;
};

const fn = (type) => (astNode) => astNode.type === type;

const component = (body) =>
  body
    .find(fn('ExportNamedDeclaration'))
    .declaration
    .body
    .body[0]
    .body
    .body
    .find(fn('ReturnStatement'))
    .argument;

const getTree = (ast) => {
  Traverser.default(ast, {
    JSXOpeningElement: (path) => {
      const jsx = path.node;
      const componentName = jsx.name.name;
      const componentAttributes = jsx.attributes;
      console.log('componentName', componentName)
    }
  });
};

const node = getTree(ast);

console.log(JSON.stringify(node, null, 2));