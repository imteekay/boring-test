const { dirname, resolve } = require('path')
const { readFile } = require('fs')

const isEmpty = (list) => list && list.length === 0;
const lastItem = (list) => list && list[list.length - 1];

// Cleaning & Getting props
const clean = (propType) =>
  propType
    .replace(' = {', '')
    .trim();

const getInstanceOf = (type) =>
  type.replace('instanceOf', '').replace(/[^a-zA-Z ]/g, "");

const buildTypes = ({ prop, type, isRequired, instanceOf, shapeTypes }) => ({
  prop,
  type,
  isRequired,
  instanceOf,
  shapeTypes
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
      isRequired,
      shapeTypes: []
    });
  }

  return buildTypes({
    prop,
    type: cleanType(type),
    isRequired
  });
}

// Reading
const filePath = '/home/leandrokinoshita/projects/boring-test/mocks/propTypes.js';
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
  const props = [];
  const result = [];
  let prop;

  namedPropTypes.forEach((propType) => {
    if (propType.type === 'shape') {
      result.push(propType);
      props.push(propType.prop);
      return; 
    }

    if (propType.type === 'end') {
      props.pop();
      return;
    }

    if (isEmpty(props)) {
      result.push(propType);
      return;
    }
    
    prop = lastItem(props);

    result.forEach((resultPropType) => {
      if (resultPropType.type === 'shape' && resultPropType.prop === prop) {
        resultPropType.shapeTypes.push(propType);
        return;
      }
    });
  });

  console.log('result', JSON.stringify(result, null, 2));
});
