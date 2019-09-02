import React from "react";
import { shallow } from "enzyme";

import ${componentToBeTested} from "../${componentToBeTested}";

describe("${componentToBeTested}", () => {
  let renderedComponent;
  const children = <div>I am a child!</div>;
  const defaultProps = {
    children,
    onClickAppBarIcon: jest.fn(),
    persistenceFinished: true,
    route: { editingMode: true }
  };

  const render = props =>
    shallow(<${componentToBeTested} {...defaultProps} {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
    renderedComponent = render();
  });

  describe("UI", () => {
    describe("renders <AnotherComponent /> with correct props", () => {
      let componentProps;

      beforeEach(() => {
        componentProps = renderedComponent.find(AnotherComponent).props();
      });

      it("has the main props", () => {
        expect(componentProps).toMatchObject({
          onClickIcon: defaultProps.onClickAppBarIcon
        });
      });
    });
  });
});
