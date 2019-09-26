import { typeToValue } from './typeValueGenerators';

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
        [prop.prop]: typeToValue[prop.type]
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
    [prop.prop]: typeToValue[prop.type]
  }

  return buildProps(
    rest,
    newPropTypes
  );
}

exports.buildProps = buildProps;
