import React from "react";
import { shallow } from "enzyme";

import RegistrationWrapper from "../index";

describe("<RegistrationWrapper />", () => {
  let renderedComponent;
  const children = <div>I am a child!</div>;
  const defaultProps = {
    children,
    onClickAppBarIcon: jest.fn(),
    persistenceFinished: true,
    route: { editingMode: true }
  };

  const render = props =>
    shallow(<RegistrationWrapper {...defaultProps} {...props} />);

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

      describe("when isAppBarVisible is true", () => {
        beforeEach(() => {
          renderedComponent = render({ isAppBarVisible: true });
          componentProps = renderedComponent.find(AnotherComponent).props();
        });

        it("has the props position and hideWithAnimation with correct values", () => {
          expect(componentProps).toMatchObject({
            hideWithAnimation: false,
            position: "fixed"
          });
        });
      });

      describe("when isAppBarVisible is false", () => {
        beforeEach(() => {
          renderedComponent = render({ isAppBarVisible: false });
          componentProps = renderedComponent.find(AnotherComponent).props();
        });

        it("has the props position and hideWithAnimation with correct values", () => {
          expect(componentProps).toMatchObject({
            hideWithAnimation: true,
            position: "relative"
          });
        });
      });

      describe("when route.editingMode is true", () => {
        it("has the prop icon with correct value", () => {
          renderedComponent = render({ route: { editingMode: true } });
          componentProps = renderedComponent.find(AnotherComponent).props();
          expect(componentProps).toMatchObject({
            icon: ArrowBack
          });
        });
      });

      describe("when route.editingMode is false", () => {
        it("has not the icon prop", () => {
          renderedComponent = render({ route: { editingMode: false } });
          componentProps = renderedComponent.find(AnotherComponent).props();
          expect(componentProps.icon).toBeUndefined();
        });
      });
    });
  });
});
