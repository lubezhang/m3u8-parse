import { structureContent, joinUrl, destructureParams } from '../../src/parse/parse-tools';
import { HLSProtocolParam, EnumProtocolTag } from '../../src/types';
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

describe('解析协议和参数，将标签和参数结构化', () => {
    test('只有标签，没有参数', () => {
        const strProtocol1 = '#EXTM3U'
        const protocol1: HLSProtocolParam = destructureParams(strProtocol1);
        expect(protocol1).not.toBeUndefined();
        expect(protocol1.Tag).toBe(EnumProtocolTag.EXTM3U);
        expect(protocol1.Params).toBeUndefined();
    });

    test('有标签，参数为数组', () => {
        const strProtocol2 = '#EXTINF:4.128,'
        const protocol2: HLSProtocolParam = destructureParams(strProtocol2);
        expect(protocol2).not.toBeUndefined();
        expect(protocol2.Tag).toBe(EnumProtocolTag.EXTINF);
        expect(protocol2.Params).not.toBeUndefined();
        if (protocol2.Params) {
            expect(protocol2.Params).toHaveLength(2);
            expect(protocol2.Params[0]).toBe('4.128');
            expect(protocol2.Params[1]).toBe('');
        }
    });
    test('有标签，参数为key : value形式的键值对', () => {
        const strProtocol3 = '#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=1064000'
        const protocol3: HLSProtocolParam = destructureParams(strProtocol3);
        expect(protocol3).not.toBeUndefined();
        expect(protocol3.Tag).toBe(EnumProtocolTag.EXT_X_STREAM_INF);
        expect(protocol3.Params).not.toBeUndefined();
        if (protocol3.Params) {
            expect(protocol3.Params['PROGRAM-ID']).toBe('1');
            expect(protocol3.Params['BANDWIDTH']).toBe('1064000');
        }
    });

    test('有标签，参数为key : value形式的键值对，参数中有URL', () => {
        const strProtocol3 = '#EXT-X-KEY:METHOD=AES-128,URI="https://ts4.chinalincoln.com:9999/20210419/OvroTYry/1000kb/hls/key.key"'
        const protocol3: HLSProtocolParam = destructureParams(strProtocol3);
        expect(protocol3).not.toBeUndefined();
        expect(protocol3.Tag).toBe(EnumProtocolTag.EXT_X_KEY);
        expect(protocol3.Params).not.toBeUndefined();
        if (protocol3.Params) {
            expect(protocol3.Params['METHOD']).toBe('AES-128');
            expect(protocol3.Params['URI']).toBe('https://ts4.chinalincoln.com:9999/20210419/OvroTYry/1000kb/hls/key.key');
        }
    });
})
