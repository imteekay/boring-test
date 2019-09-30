import { buildProps } from './propTypes/buildProps';
import { getComponentFilePath } from './propTypes/getComponentFilePath';

const componentReplacement = (content, componentName) =>
  content
    .split("${componentToBeTested}")
    .join(componentName);

const addInnerComponentProps = async (content, filePath) => {
  const innerComponentFilePath = await getComponentFilePath(filePath);
  const innerComponentProps = buildProps(innerComponentFilePath);

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
