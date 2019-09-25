import { buildProps } from './buildProps';
import { getComponentFilePath } from './getComponentFilePath';

const componentReplacement = (content, componentName) =>
  content
    .split("${componentToBeTested}")
    .join(componentName);

const addInnerComponentProps = async (content, filePath) => {
  const innerComponentFilePath = await getComponentFilePath(filePath);
  const innerComponentProps = buildProps(innerComponentFilePath);

  return content
    .replace('${innerComponentProps}', JSON.stringify(innerComponentProps, null, 2));
}

export { componentReplacement, addInnerComponentProps };
