import { HLSProtocol, EnumProtocolTag, EnumPlayListType } from '../../src/types';
import { parseProtocol } from '../../src/parse/parse';
import { m3u8Master, m3u8Vod } from './test.data';

describe('解析协议，src/parse/parse', () => {
    test('将字符串形式的文件内容结构化成协议对象，主文件', () => {
        const body: HLSProtocol = parseProtocol(m3u8Master);
        expect(body).not.toBeUndefined();
        expect(body.EXTM3U).toBe(EnumProtocolTag.EXTM3U);
        expect(body.EXT_X_STREAM_INF).not.toBeUndefined();

        // console.log(body);
    });

    test('将字符串形式的文件内容结构化成协议对象，点播文件', () => {
        const body: HLSProtocol = parseProtocol(m3u8Vod);
        expect(body).not.toBeUndefined();
        expect(body.EXTM3U).toBe(EnumProtocolTag.EXTM3U);

        expect(body.EXT_X_PLAYLIST_TYPE).toBe(EnumPlayListType.Vod);

        expect(body.EXTINF).not.toBeUndefined();
        expect(body.EXTINF).not.toHaveLength(0)
        if (body.EXTINF) {
            expect(body.EXTINF[0].Tag).toBe('#EXTINF');
            expect(body.EXTINF[0].Attrs).toBe('#EXTINF:4.128,');
        }
    });
});
