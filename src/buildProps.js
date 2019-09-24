const props = [
  {
    "prop": "name",
    "type": "string",
    "isRequired": false
  },
  {
    "prop": "isReal",
    "type": "bool",
    "isRequired": false
  },
  {
    "prop": "bedrooms",
    "type": "number",
    "isRequired": false
  },
  {
    "prop": "intl",
    "type": "intlShape",
    "isRequired": false
  },
  {
    "prop": "image",
    "type": "instanceOf",
    "isRequired": false,
    "instanceOf": "Img"
  },
  {
    "prop": "width",
    "type": "WidthPropType",
    "isRequired": true
  },
  {
    "prop": "breadcrumbInfo",
    "type": "shape",
    "isRequired": false,
    "shapeTypes": [
      {
        "prop": "city",
        "type": "string",
        "isRequired": false
      },
      {
        "prop": "displayId",
        "type": "string",
        "isRequired": false
      },
      {
        "prop": "regionName",
        "type": "string",
        "isRequired": false
      },
      {
        "prop": "state",
        "type": "string",
        "isRequired": false
      },
      {
        "prop": "street",
        "type": "string",
        "isRequired": false
      }
    ]
  },
  {
    "prop": "houseInfo",
    "type": "shape",
    "isRequired": false,
    "shapeTypes": [
      {
        "prop": "type",
        "type": "string",
        "isRequired": false
      },
      {
        "prop": "bedrooms",
        "type": "number",
        "isRequired": false
      },
      {
        "prop": "displayId",
        "type": "string",
        "isRequired": false
      }
    ]
  },
  {
    "prop": "region",
    "type": "shape",
    "isRequired": false,
    "shapeTypes": [
      {
        "prop": "name",
        "type": "string",
        "isRequired": false
      }
    ]
  },
  {
    "prop": "address",
    "type": "shape",
    "isRequired": false,
    "shapeTypes": [
      {
        "prop": "city",
        "type": "string",
        "isRequired": false
      }
    ]
  }
]

const generateString = () => 'abs';
const generateBool = () => true;
const generateNumber = () => 123;
const generateIntlShape = () => 'tricky';
const generateInstanceOf = () => 'tricky';
const generateWidthPropType = () => '100';

const mapper = {
  string: generateString(),
  bool: generateBool(),
  number: generateNumber(),
  intlShape: generateIntlShape(),
  instanceOf: generateInstanceOf(),
  WidthPropType: generateWidthPropType(),
}

const buildProps = (props, propTypes = {}, shapeProp, shapeRestListCount) => {
  if (props.length === 0) {
    return propTypes;
  }

  const prop = props[0];
  const lastPropIndex = props.length;
  const rest = props.slice(1, lastPropIndex);

  if (prop.type === 'shape') {
    const shapeProps = buildProps(
      prop.shapeTypes,
      propTypes,
      prop.prop,
      prop.shapeTypes.length
    );

    return buildProps(
      rest,
      shapeProps
    );
  }

  if (shapeProp && shapeRestListCount && shapeRestListCount > 0) {
    const lastShapeTypesIndex = props.length;
    const shapeTypesRest = props.slice(1, lastShapeTypesIndex);
    const newPropTypes = {
      ...propTypes,
      [shapeProp]: {
        ...propTypes[shapeProp],
        [prop.prop]: mapper[prop.type]
      }
    };

    return buildProps(
      shapeTypesRest,
      newPropTypes,
      shapeProp,
      shapeRestListCount - 1
    );
  }

  const newPropTypes = {
    ...propTypes,
    [prop.prop]: mapper[prop.type]
  }

  return buildProps(
    rest,
    newPropTypes
  );
}

const result = buildProps(props);

console.log('\n------------------ RESULT --------------------------\n')
console.log(result);