import { structureContent, joinUrl } from '../../src/parse/parse-tools';
import { m3u8Master } from './test.data';

describe('src/parse/parse-tools', () => {
    test('将字符串形式的文件内容转成一行一个元素的数组', () => {
        const array = structureContent(m3u8Master);
        expect(array).not.toHaveLength(0);
        expect(array[0]).toBe('#EXTM3U');
    });

    test('URL 拼接', () => {
        const baseUrl = 'https://dco4urblvsasc.cloudfront.net/811/81095_ywfZjAuP/game/index.m3u8';
        const playUrl1 = 'https://dco4urblvsasc.cloudfront.net/811/81095_ywfZjAuP/game/2000kbps.m3u8';
        const playUrl2 = '/hls/2000kbps.m3u8';
        const playUrl3 = '2000kbps.m3u8';

        const url1 = joinUrl(playUrl1, baseUrl);
        expect(url1).toBe(playUrl1);

        const url2 = joinUrl(playUrl2, baseUrl);
        expect(url2).toBe('https://dco4urblvsasc.cloudfront.net' + playUrl2);

        const url3 = joinUrl(playUrl3, baseUrl);
        expect(url3).toBe('https://dco4urblvsasc.cloudfront.net/811/81095_ywfZjAuP/game/' + playUrl3);
    });
});
