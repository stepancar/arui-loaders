import compiler from './compiler.js';

test('should build with arui-feather correctly', async () => {
    const stats = await compiler('test-component/index.jsx');
    expect(stats.toJson().errors).toEqual([]);
});

test('should inject import arui-feather/cn statement', async () => {
    let output;
    const stats = await compiler('test-component/index.jsx', { cb: (o) => output = o });
    expect(stats.toJson().errors).toEqual([]);
    expect(output).toContain("import cn from 'arui-feather/cn';\n");
});

test('should inject import index.css statement', async () => {
    let output;
    const stats = await compiler('test-component/index.jsx', { cb: (o) => output = o });
    expect(stats.toJson().errors).toEqual([]);
    expect(output).toContain("import './index.css';");
});

test('should inject @cn statement', async () => {
    let output;
    const stats = await compiler('test-component/index.jsx', { cb: (o) => output = o });
    expect(stats.toJson().errors).toEqual([]);
    expect(output).toContain("@cn('test-component')");
});

test('should replace cn to cn()', async () => {
    let output;
    const stats = await compiler('test-component/index.jsx', { cb: (o) => output = o });
    expect(stats.toJson().errors).toEqual([]);
    expect(output).toContain("className={ cn() }");
    expect(output).not.toContain("className={ cn }");
});
