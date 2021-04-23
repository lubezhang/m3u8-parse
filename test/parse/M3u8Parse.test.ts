import M3u8Parse from '../../src/parse/M3u8Parse';

describe('src/parse/M3u8Parse', () => {
    test('测试 M3u8Parse实例化', () => {
        const content = 'sdfsdf';
        const m3u8Parse = new M3u8Parse(content);
        expect(m3u8Parse).not.toBeUndefined();
    });

    test('测试 M3u8Parse解析M3u8文件', () => {
        const content = 'sdfsdf';
        const m3u8Parse = new M3u8Parse(content);
        expect(m3u8Parse.m3u8Content).toBe('sdfsdf');
        expect(m3u8Parse.key).not.toBeUndefined();
    });

});
