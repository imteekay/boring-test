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
  const [prop, typeShape] = propType.split(': ');
  const type = typeShape.split('.')[1]
  return {
    prop,
    type
  }
}

propTypes.map(buildNamedPropTypes)