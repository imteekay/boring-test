import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { TestComponent } from './TestComponent';
import { OtherComponent } from './OtherComponent';

export const Component = () => (
  <Fragment>
    <TestComponent
      name='string'
      isReal={true}
      bedrooms={2}
      width='xs'
      breadcrumbInfo={breadcrumbInfo}
      houseInfo={houseInfo}
    />
    <OtherComponent />
  </Fragment>
);

Component.propTypes = {
  name: PropTypes.string,
};

export default Component;
