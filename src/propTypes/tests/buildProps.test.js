import { buildProps } from '../buildProps';

const propTypes = [
  {
    prop: 'name',
    type: 'string',
    isRequired: false,
    instanceOf: undefined,
    shapeTypes: undefined
  },
  {
    prop: 'isReal',
    type: 'bool',
    isRequired: false,
    instanceOf: undefined,
    shapeTypes: undefined
  },
  {
    prop: 'bedrooms',
    type: 'number',
    isRequired: false,
    instanceOf: undefined,
    shapeTypes: undefined
  },
  {
    prop: 'intl',
    type: 'intlShape',
    isRequired: false,
    instanceOf: undefined,
    shapeTypes: undefined
  },
  {
    prop: 'image',
    type: 'instanceOf',
    isRequired: false,
    instanceOf: 'Img',
    shapeTypes: undefined
  },
  {
    prop: 'width',
    type: 'WidthPropType',
    isRequired: true,
    instanceOf: undefined,
    shapeTypes: undefined
  },
  {
    prop: 'breadcrumbInfo',
    type: 'shape',
    isRequired: false,
    instanceOf: undefined,
    shapeTypes: [
      {
        prop: 'city',
        type: 'string',
        isRequired: false,
        instanceOf: undefined,
        shapeTypes: undefined
      },
      {
        prop: 'displayId',
        type: 'string',
        isRequired: false,
        instanceOf: undefined,
        shapeTypes: undefined
      },
      {
        prop: 'regionName',
        type: 'string',
        isRequired: false,
        instanceOf: undefined,
        shapeTypes: undefined
      },
      {
        prop: 'state',
        type: 'string',
        isRequired: false,
        instanceOf: undefined,
        shapeTypes: undefined
      },
      {
        prop: 'street',
        type: 'string',
        isRequired: false,
        instanceOf: undefined,
        shapeTypes: undefined
      }
    ]
  },
  {
    prop: 'houseInfo',
    type: 'shape',
    isRequired: false,
    instanceOf: undefined,
    shapeTypes: [ [Object], [Object], [Object] ]
  },
  {
    prop: 'region',
    type: 'shape',
    isRequired: false,
    instanceOf: undefined,
    shapeTypes: [ [Object] ]
  },
  {
    prop: 'address',
    type: 'shape',
    isRequired: false,
    instanceOf: undefined,
    shapeTypes: [ [Object] ]
  }
];

describe('buildProps', () => {
  it('returns a props object', () => {
    expect(buildProps())
  });
});
