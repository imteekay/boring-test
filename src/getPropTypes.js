const { dirname, resolve } = require('path')
const { readFile } = require('fs')

// Cleaning & Getting props
const clean = (propType) =>
  propType
    .replace(' = {\n', '')
    .replace('\n', '')
    .trim();

const getInstanceOf = (type) =>
  type.replace('instanceOf', '').replace(/[^a-zA-Z ]/g, "");

const buildNamedPropTypes = (propType) => {
  const [prop, typeShape] = propType.split(': ');
  const [propTypes, type, isRequiredString] = typeShape.split('.');
  const isRequired = Boolean(isRequiredString);

  if (['ThemePropType', 'intlShape'].includes(propTypes)) {
    return {
      prop,
      type: propTypes,
      isRequired
    }
  }

  if (type.includes('instanceOf')) {
    return {
      prop,
      type: 'instanceOf',
      isRequired,
      instanceOf: getInstanceOf(type)
    }
  }

  if (type.includes('shape')) {
    return {
      prop,
      type: 'shape',
      isRequired
    }
  }

  return {
    prop,
    type,
    isRequired
  }
}

// Reading
const path = resolve(dirname, '/Users/leandrotk/projects/qa/photos-pwa/app/containers/PhotoSessions/NotStartedPhotoSessions.js')

readFile(path, 'utf8', (err, data) => {
  const propTypes = data
    .split('propTypes')[1]
    .split('}')[0]
    .split(',')
    .map(clean)
    .filter(Boolean)

  const result = propTypes.map(buildNamedPropTypes)

  console.log(result)
})
