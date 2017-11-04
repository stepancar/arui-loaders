import compiler from './compiler.js';

test('should build with arui-feather correctly', async () => {
    const stats = await compiler('test-component/index.css');
    expect(!stats.hasErrors())
});

test('should inject class for bem block', async () => {
    let output;
    const stats = await compiler('test-component/index.jsx', { cssLoaderCb: (o) => output = o });
    expect(!stats.hasErrors())
    expect(output).toContain('.test-component {');
});