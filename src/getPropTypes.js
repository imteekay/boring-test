const { dirname, resolve } = require('path')
const { readFile } = require('fs')

let path;
let clean;
let propTypes;
let buildNamedPropTypes;

// Cleaning & Getting props
clean = (propType) =>
  propType
    .replace(' = {\n', '')
    .replace('\n', '')
    .trim()

buildNamedPropTypes = (propType) => {
  let [prop, typeShape] = propType.split(': ');
  let [propTypes, type, isRequired] = typeShape.split('.');
  let instanceOf;

  if (['ThemePropType', 'intlShape'].includes(propTypes)) {
    type = propTypes;
  }

  if (type.includes('instanceOf')) {
    instanceOf = type.replace('instanceOf', '').replace(/[^a-zA-Z ]/g, "");
    type = 'instanceOf';
  }

  if (type.includes('shape')) {
    type = 'shape';
  }

  isRequired = Boolean(isRequired);

  return {
    prop,
    type,
    isRequired,
    instanceOf
  }
}

// Reading
path = resolve(dirname, '/home/leandrokinoshita/projects/photos-pwa/app/containers/PhotoSessions/NotStartedPhotoSessions.js')

readFile(path, 'utf8', (err, data) => {
  propTypes = data
    .split('propTypes')[1]
    .split('}')[0]
    .split(',')
    .map(clean)
    .filter(Boolean)

  const result = propTypes.map(buildNamedPropTypes)

  console.log(result)
})