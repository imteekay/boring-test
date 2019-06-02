import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';

import ${componentToBeTested} from '../${componentToBeTested}';

describe('${componentToBeTested}', () => {
  const defaultProps = { propHere: 'propvValue' };
  const render = (props) => renderer.create(<${componentToBeTested} {...defaultProps} {...props} />).toJSON();

  describe('when prop has some value', () => {
    it('has the style rule', () => {
      const component = render();
      const cssStyle = 'css-style';
      const cssValue = 'css-value';

      expect(component).toHaveStyleRule(cssStyle, cssValue);
    });
  });
});
