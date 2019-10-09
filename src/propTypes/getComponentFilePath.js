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

// const deep = (tree) => {
//   if (typeof tree !== 'object' || tree === null) {
//     return null;
//   }

//   if (Array.isArray(tree)) {
//     return tree.map(node => deep(node))
//   }

//   // console.log(tree, typeof tree)

//   if (tree.type === 'JSXElement') {
//     return tree;
//   }

//   const keys = Object.keys(tree);

//   return keys.reduce((acc, key) => {
//     const node = deep(tree[key]);

//     if (node === null) {
//       return acc;
//     }

//     return {
//       ...acc,
//       [key]: node
//     };
//   }, {});
// };

// console.log(JSON.stringify(ast, null, 2))

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

const getTree = (ast) => {
  const fn = (type) => (astNode) => astNode.type === type;

  // Let's make it better!
  const initialAst = ast
    .program
    .body
    .find(fn('ExportNamedDeclaration'))
    .declaration
    .body
    .body[0]
    .body
    .body
    .find(fn('ReturnStatement'))
    .argument;

  return reduceAstNode([], initialAst);
};

const node = getTree(ast);

console.log(JSON.stringify(node, null, 2));