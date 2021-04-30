import { encryptAes, decryptAes, decryptFileAes } from '../../src/parse';
describe('单独测试 加/解密函数', () => {
    const key = 'ABCDEFGHIJKLMNOP';
    const iv = '0000000000000001';

    test('测试 AES 加密函数', () => {
        const res = 'fb378cce34050271f56bd67d9cb411d1';
        const data = Buffer.from('11');
        const objencrypt = encryptAes(data, key, iv);

        expect(objencrypt.toString('hex')).toBe(res);
    });

    test('测试 AES 解密函数', () => {
        const res = '11';
        const src = 'fb378cce34050271f56bd67d9cb411d1';
        const data = Buffer.from(src, 'hex');
        const objdecrypt = decryptAes(data, key, iv);

        expect(objdecrypt.toString()).toBe(res);
    });
});

describe('视频片段解密', () => {
    jest.setTimeout(99999);
    const key = 'e74dfaa3fbf8c9ed';
    const iv = '0000000000000000';
    const filePath = '/Users/zhangqinghong/study/nodejs/m3u8-parse/test-data/0.ts'
    // test('解密视频片段(同步) - AES-128', () => {
    //     decryptFileAesSync(filePath, key, iv);
    //     expect(1).toBe(1);
    // });

    // test('解密视频片段(异步) - AES-128', async () => {
    //     const res = await decryptFileAes(filePath, key, iv);
    //     expect(res).not.toBeUndefined();
    //     expect(res).not.toBe('');
    //     expect(typeof res).toBe('string');
    //     console.log(res);
    // });
});
