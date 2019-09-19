const { dirname, resolve } = require('path')
const { readFile } = require('fs')

// Cleaning & Getting props
const clean = (propType) =>
  propType
    .replace(' = {', '')
    .trim();

const getInstanceOf = (type) =>
  type.replace('instanceOf', '').replace(/[^a-zA-Z ]/g, "");

const buildTypes = ({ prop, type, isRequired, instanceOf }) => ({
  prop,
  type,
  isRequired,
  instanceOf
});

const cleanType = (type) =>
  type.replace(',', '');

const buildNamedPropTypes = (propType) => {
  if (propType.includes('})')) {
    return buildTypes({ type: 'end' });
  }

  const [prop, typeShape] = propType.split(': ');
  const [propTypes, type, isRequiredString] = typeShape.split('.');
  const propTypesList = ['ThemePropType', 'intlShape', 'WidthPropType'];
  const isRequired = Boolean(isRequiredString);

  if (propTypesList.includes(propTypes)) {
    return buildTypes({
      prop,
      type: propTypes,
      isRequired
    });
  }

  if (type.includes('instanceOf')) {
    return buildTypes({
      prop,
      type: 'instanceOf',
      isRequired,
      instanceOf: getInstanceOf(type)
    });
  }

  if (type.includes('shape')) {
    return buildTypes({
      prop,
      type: 'shape',
      isRequired
    });
  }

  return buildTypes({
    prop,
    type: cleanType(type),
    isRequired
  });
}

// Reading
const filePath = '/Users/leandrotk/projects/boring-test/mocks/propTypes.js';
const path = resolve(dirname, filePath);

readFile(path, 'utf8', (error, data) => {
  if (error) {
    const errorMessage = `Error: ${error}`;
    console.log(errorMessage);
    return errorMessage;
  }

  const propTypes = data
    .split('propTypes')[1]
    .split('};')[0]
    .split('\n')
    .map(clean)
    .filter(Boolean);

  const namedPropTypes = propTypes.map(buildNamedPropTypes);
  console.log(namedPropTypes);
  console.log(namedPropTypes.map(a => a.type))

  // Algorithm
  // para saber quando é para colocar na lista de shapeType, apenas colocar
  // numa estrutura de dados que o primeiro elemento fala qual a prop que
  // é preciso colocar os itens
  // quando tem um `end`, remove essa prop da lista.

  // API
  // usar push para adicionar
  // usar pop para remover o ultimo
  // para pegar o ultimo elemento: array[array.length - 1]

  // Data Structure
  // [
  //   {
  //     prop,
  //     type,
  //     isRequired,
  //     instanceOf
  //   },
  //   {
  //     prop,
  //     type: 'shape',
  //     isRequired,
  //     instanceOf,
  //     shapeTypes: [
  //       {
  //         prop,
  //         type,
  //         isRequired,
  //         instanceOf
  //       },
  //       {
  //         prop,
  //         type,
  //         isRequired,
  //         instanceOf
  //       },
  //     ]
  //   },
  // ]
});
