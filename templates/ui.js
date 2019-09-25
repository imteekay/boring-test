import React from 'react';
import { shallow } from 'enzyme';

import { ${componentToBeTested} } from '../${componentToBeTested}';

describe('${componentToBeTested}', () => {
  let renderedComponent;

  const defaultProps = {
    someProp: 'someProp',
  };

  const render = (props) => shallow(<${componentToBeTested} {...defaultProps} {...props} />);

  beforeAll(() => {
    renderedComponent = render();
  });

  describe('UI', () => {
    describe('renders <InnerComponent /> with correct props', () => {
      let innerComponent;
      let componentProps;

      beforeAll(() => {
        innerComponent = renderedComponent.find(InnerComponent);
        componentProps = innerComponent.props();
      });

      it('finds the other component inside the main component', () => {
        expect(innerComponent).toHaveLength(1);
      });

      it('has the main props', () => {
        expect(componentProps).toMatchObject(${innerComponentProps});
      });
    });
  });
});
