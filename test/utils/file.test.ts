import { mergeFile } from '../../src/utils/file';

jest.setTimeout(3000000);
describe('src/file', () => {
    // test('测试 mergePiece', async () => {
    //     const path1 = '/Users/zhangqinghong/study/deno/m3u8-parse/data/.tmp/86af0278c168dd7f6466a168258d390a';
    //     const path = await mergePiece(path1, '1.mp4');
    //     console.log(path);
    // });
    test('测试 mergeFile', () => {
        const path1 = '/Users/zhangqinghong/study/deno/m3u8-parse/data/.tmp/86af0278c168dd7f6466a168258d390a/.temp';
        // const path = mergeFile(path1);
        // console.log(path);
    });
})
