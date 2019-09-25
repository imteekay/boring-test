const componentReplacement = (content, componentName) =>
  content
    .split("${componentToBeTested}")
    .join(componentName);

export { componentReplacement };
