import { getMd5 } from '../../src/utils/string';

describe('src/utils', () => {
    test('测试 getMd5', () => {
        const strMd5 = getMd5('1');
        expect(strMd5).toBe('c4ca4238a0b923820dcc509a6f75849b')

        const strMd51 = getMd5('11');
        expect(strMd51).toBe('6512bd43d9caa6e02c990b0a82652dca')
    });
})
