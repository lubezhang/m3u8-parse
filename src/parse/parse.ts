import { M3u8Body, EnumPlayListType, HLSProtocol, EnumProtocolTag } from '../types/types-m3u8';
import { structureContent, destructureParams } from './parse-tools';

export const parseProtocol = (constent: string): HLSProtocol => {
    const protocol: HLSProtocol = {
        EXTM3U: EnumProtocolTag.EXTM3U
    };
    const list: IterableIterator<[number, string]> = structureContent(constent).entries();
    const reg = /(^#E([^:])+)/; // 匹配协议标签
    // const contents = list;
    for (let index = 0; true; index++) {
        const res = list.next();
        if (res.done === true) { // 迭代结束，跳出循环
            break;
        }

        const val: [number, string] = res.value; // 第一个元素是索引，第二个元素是一行的内容
        if (Array.isArray(val) && val.length === 2) {
            const tmp = val[1].match(reg);
            if (tmp) {
                // console.log(tmp[0]);
                switch(tmp[0]) {
                case EnumProtocolTag.EXTM3U:
                    protocol.EXTM3U = tmp[0];
                    break;
                case EnumProtocolTag.EXT_X_ENDLIST:
                    protocol.EXT_X_ENDLIST = tmp[0];
                    break;
                // https://developer.apple.com/library/archive/technotes/tn2288/_index.html#//apple_ref/doc/uid/DTS40012238-CH1-BASIC_VARIANT_PLAYLIST
                case EnumProtocolTag.EXT_X_STREAM_INF:
                    parseExtXStreamInf(protocol, val[1], list.next());
                    break;
                case EnumProtocolTag.EXT_X_PLAYLIST_TYPE:
                    const paramsType = destructureParams(val[1]);
                    protocol.EXT_X_PLAYLIST_TYPE = paramsType.Params[0];
                    break;
                case EnumProtocolTag.EXTINF:
                    parseExtinf(protocol, val[1], list.next());
                    break;
                case EnumProtocolTag.EXT_X_KEY:
                    parseExtXKey(protocol, val[1]);
                    break;
                }
            }
        }
    }
    return protocol;
}

const parseExtXStreamInf = (protocol: HLSProtocol, strProtocol: string, nextVal: any): void => {
    if (!protocol.EXT_X_STREAM_INF) {
        protocol.EXT_X_STREAM_INF = [];
    }
    const params = destructureParams(strProtocol).Params;
    const val = nextVal ? nextVal.value[1] : undefined;
    protocol.EXT_X_STREAM_INF.push(Object.assign({}, params, {
        Tag: EnumProtocolTag.EXT_X_STREAM_INF,
        Attrs: strProtocol,
        Value: val
    }));
}

const parseExtinf = (protocol: HLSProtocol, strProtocol: string, nextVal?: any): void => {
    if (!protocol.EXTINF) {
        protocol.EXTINF = [];
    }
    const params = destructureParams(strProtocol).Params;
    const val = nextVal ? nextVal.value[1] : undefined;
    protocol.EXTINF.push({
        Tag: EnumProtocolTag.EXTINF,
        Attrs: strProtocol,
        Value: val,
        Duration: parseFloat(params[0]),
        Title: params[1] ? params[1] : '',
        Url: val
    });
}

const parseExtXKey = (protocol: HLSProtocol, strProtocol: string): void => {
    if (!protocol.EXT_X_KEY) {
        protocol.EXT_X_KEY = [];
    }

    const paramsKey = destructureParams(strProtocol).Params;
    // protocol.EXT_X_KEY.push(paramsKey);
    protocol.EXT_X_KEY.push(Object.assign({}, paramsKey, {
        Tag: EnumProtocolTag.EXT_X_STREAM_INF,
        Attrs: strProtocol
    }));
}

export const parse = (constent: string): M3u8Body => {
    const body: M3u8Body = {
        playlistType: EnumPlayListType.Master
    };
    const list: IterableIterator<[number, string]> = structureContent(constent).entries();
    // const contents = list;
    for (let index = 0; true; index++) {
        const res = list.next();
        if (res.done === true) { // 迭代结束，跳出循环
            break;
        }

        const val: [number, string] = res.value;
        const reg = /(^#([^:])+)/; //
        if (Array.isArray(val) && val.length === 2) {
            const tmp = val[1].match(reg);
            if (tmp) {
                console.log(tmp[0]);
            }

            // switch (val[1])
            // console.log(res.value[1]);
        }
    }
    return body;
}
