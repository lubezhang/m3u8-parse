import { HLSProtocol, EnumProtocolTag, EnumPlayListType } from '../../src/types';
import { parseProtocol } from '../../src/parse/parse';
import { m3u8Master, m3u8Vod } from './test.data';

describe('解析协议，src/parse/parse', () => {
    test('将字符串形式的文件内容结构化成协议对象，主文件', () => {
        const body: HLSProtocol = parseProtocol(m3u8Master);
        expect(body).not.toBeUndefined();
        expect(body.EXTM3U).toBe(EnumProtocolTag.EXTM3U);
        expect(body.EXT_X_STREAM_INF).not.toBeUndefined();
        expect(body.EXT_X_STREAM_INF).toHaveLength(4);
        if (body.EXT_X_STREAM_INF && body.EXT_X_STREAM_INF[0]) {
            expect(body.EXT_X_STREAM_INF[0].Value).toBe('1000kbps.m3u8');
        }
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
            expect(body.EXTINF[0].Url).toBe('https://ts4.chinalincoln.com:9999/20210419/OvroTYry/1000kb/hls/YMgVK9tU.ts');
            expect(body.EXTINF[0].EncryptIndex).toBeUndefined();
            expect(body.EXTINF[2].EncryptIndex).toBe(0);
            expect(body.EXTINF[8].EncryptIndex).toBe(1);
        }
    });

    test('将字符串形式的文件内容结构化成协议对象，加密信息', () => {
        const body: HLSProtocol = parseProtocol(m3u8Vod);
        expect(body).not.toBeUndefined();
        expect(body.EXTM3U).toBe(EnumProtocolTag.EXTM3U);

        expect(body.EXT_X_KEY).not.toBeUndefined();
        expect(body.EXT_X_KEY).not.toHaveLength(0)
        if (body.EXT_X_KEY) {
            expect(body.EXT_X_KEY[0].Tag).toBe('#EXT-X-KEY');
            expect(body.EXT_X_KEY[0].Attrs).toBe('#EXT-X-KEY:METHOD=AES-128,URI="https://ts4.chinalincoln.com:9999/20210419/OvroTYry/1000kb/hls/key.key"');
            expect(body.EXT_X_KEY[0].METHOD).toBe('AES-128');
            expect(body.EXT_X_KEY[0].URI).toBe('https://ts4.chinalincoln.com:9999/20210419/OvroTYry/1000kb/hls/key.key');
        }
    });
});
