import { getLastElement, getFirstElement } from "./utils";

const getTemplateFile = template => {
  switch (template) {
    case "css":
      return "templates/css.js";
    default:
      return "";
  }
};

const getComponentName = file => {
  const fileList = file.split("/");
  const fileName = getLastElement(fileList);
  const componentName = getFirstElement(fileName.split("."));
  return componentName;
};

const componentReplacement = (content, componentName) =>
  content.split("${componentToBeTested}").join(componentName);

export { getTemplateFile, getComponentName, componentReplacement };
