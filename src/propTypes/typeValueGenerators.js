const generateString = () => 'abs';
const generateBool = () => true;
const generateNumber = () => 123;
const generateIntlShape = () => 'tricky';
const generateInstanceOf = () => 'tricky';
const generateWidthPropType = () => '100';

export const typeToValue = {
  string: generateString(),
  bool: generateBool(),
  number: generateNumber(),
  intlShape: generateIntlShape(),
  instanceOf: generateInstanceOf(),
  WidthPropType: generateWidthPropType(),
}
