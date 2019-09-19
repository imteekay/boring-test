import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { WidthPropType } from 'block-party/prop-types/Material';

export class TestComponent extends React.PureComponent {
  render() {
    return <div />;
  }
}

Breadcrumb.propTypes = {
  name: PropTypes.string,
  isReal: PropTypes.bool,
  bedrooms: PropTypes.number,
  intl: intlShape.isRequired,
  image: PropTypes.instanceOf(Img),
  width: WidthPropType.all.isRequired,
  breadcrumbInfo: PropTypes.shape({
    city: PropTypes.string,
    displayId: PropTypes.string,
    regionName: PropTypes.string,
    state: PropTypes.string,
    street: PropTypes.string,
  }),
  houseInfo: PropTypes.shape({
    type: PropTypes.string,
    bedrooms: PropTypes.number,
    region: PropTypes.shape({
      name: PropTypes.string,
    }),
    address: PropTypes.shape({
      city: PropTypes.string,
    }),
    displayId: PropTypes.string,
  }).isRequired,
};

export default TestComponent;
