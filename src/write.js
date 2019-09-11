import {
  getLastElement,
  getFirstElement,
  getSecondElement,
  excludeLast
} from "./utils.js";

const TESTS = "tests";
const TEST = "test";

const templateCallback = file => e => {
  if (e) throw e;
  console.log(`Created ${file} template! 😎`);
};

const creationCallback = e => {
  if (e) throw e;
  console.log("Created! 😎");
};

const getTestFileName = fileName => {
  const fileNameList = fileName.split(".");
  const componentName = getFirstElement(fileNameList);
  const fileExtension = getSecondElement(fileNameList);

  return [componentName, TEST, fileExtension].join(".");
};

const getTestPath = file => {
  const fileList = file.split("/");
  const fileName = getLastElement(fileList);
  const testFileName = getTestFileName(fileName);
  const folders = excludeLast(fileList);

  return [...folders, TESTS, testFileName].join("/");
};

export { templateCallback, creationCallback, getTestPath };
