import {
  getTemplateFile,
  getComponentName,
  componentReplacement
} from "../src/read";

describe("getTemplateFile", () => {
  describe("with no template file", () => {
    it("returns no template", () => {
      expect(getTemplateFile()).toEqual("templates/default.js");
    });
  });

  describe("with css template", () => {
    it("returns the correct template path", () => {
      const template = "css";
      expect(getTemplateFile(template)).toEqual("templates/css.js");
    });
  });
});

describe("getComponentName", () => {
  it("returns the component name from the file", () => {
    const filePath = "app/containers/Component.js";
    expect(getComponentName(filePath)).toEqual("Component");
  });
});

describe("componentReplacement", () => {
  it("returns the component name from the file", () => {
    const template = "<${componentToBeTested}>Some</${componentToBeTested}>";
    const component = "Component";
    const newTest = `<${component}>Some</${component}>`;
    expect(componentReplacement(template, component)).toEqual(newTest);
  });
});
