import { getComponentFilePath } from './propTypes/getComponentFilePath';
import { getComponentPropTypes } from './propTypes/getComponentPropTypes';
import { buildProps } from './propTypes/buildProps';

const componentReplacement = (content, componentName) =>
  content
    .split("${componentToBeTested}")
    .join(componentName);

const addInnerComponentProps = async (content, filePath) => {
  const innerComponentFilePath = await getComponentFilePath(filePath);
  const propsDataStructure = await getComponentPropTypes(innerComponentFilePath);
  const innerComponentProps = buildProps(propsDataStructure);

  return content
    .replace(
      '${innerComponentProps}',
      JSON.stringify(innerComponentProps, null, 2)
    );
};

const isUiTemplate = (template) =>
  template === 'ui';

const createNewTest = async ({ content, componentName, filePath, template }) => {
  const replacedComponentTest = componentReplacement(content, componentName);

  return isUiTemplate(template)
    ? await addInnerComponentProps(replacedComponentTest, filePath)
    : replacedComponentTest;
};

export { componentReplacement, addInnerComponentProps, createNewTest };
