import { getComponentFilePath } from '../getComponentFilePath';

describe('getComponentFilePath', () => {
  it('generates proper path from component file', async () => {
    const filePath = 'mocks/Component.js';

    const path = await getComponentFilePath(filePath);

    expect(path).toEqual('mocks/TestComponent.js');
  });
});
