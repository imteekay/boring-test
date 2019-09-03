import React from 'react';
import { shallow } from 'enzyme';

import ${componentToBeTested} from '../${componentToBeTested}';

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
    describe('renders <AnotherComponent /> with correct props', () => {
      let anotherComponent;
      let componentProps;

      beforeAll(() => {
        anotherComponent = renderedComponent.find(AnotherComponent);
        componentProps = anotherComponent.props();
      });

      it('finds the other component inside the main component', () => {
        expect(anotherComponent).toHaveLength(1);
      });

      it('has the main props', () => {
        expect(componentProps).toMatchObject({
          someProp: defaultProps.someProp,
        });
      });
    });
  });
});
