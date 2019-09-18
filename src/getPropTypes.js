const { dirname, resolve } = require('path')
const { readFile } = require('fs')

let path;
let content;
let clean;
let propTypes;
let buildNamedPropTypes;

// Reading
path = resolve(dirname, '/home/leandrokinoshita/projects/photos-pwa/app/containers/PhotoSessions/NotStartedPhotoSessions.js')
readFile(path, 'utf8', (err, data) => content = data)

// Cleaning & Getting props
clean = (propType) => propType.replace(' = {\n', '').replace('\n', '').trim()

propTypes = content.split('propTypes')[1].split('}')[0].split(',').map(clean).filter(Boolean)

buildNamedPropTypes = (propType) => {
  let [prop, typeShape] = propType.split(': ');
  let [propTypes, type, isRequired] = typeShape.split('.');

  if (propTypes === 'intlShape') {
    type = 'intlShape';
  }

  isRequired = Boolean(isRequired);

  return {
    prop,
    type,
    isRequired
  }
}

propTypes.map(buildNamedPropTypes)