import React from 'react';
import PropTypes from 'prop-types';
import { TestComponent } from './TestComponent';

export const Component = () => (
  <TestComponent
    name='string'
    isReal={true}
    bedrooms={2}
    width='xs'
    breadcrumbInfo={breadcrumbInfo}
    houseInfo={houseInfo}
  >
    <OtherComponent />
  </TestComponent>
);

Component.propTypes = {
  name: PropTypes.string,
};

export default Component;
