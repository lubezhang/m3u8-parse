/**
 * m3u8协议的tag定义
 */
export enum EnumProtocolTag {
    /** 文件首行的标记 */
    EXTM3U = '#EXTM3U',
    /** 视频流地址 */
    EXTINF = '#EXTINF',
    /** 主文件 master playlist */
    EXT_X_STREAM_INF = '#EXT-X-STREAM-INF',
    /** 文件类型 */
    EXT_X_PLAYLIST_TYPE = '#EXT-X-PLAYLIST-TYPE',
    /** 视频流结束标示 */
    EXT_X_ENDLIST = '#EXT-X-ENDLIST',
    /** 文件加密 */
    EXT_X_KEY = '#EXT-X-KEY',
}

export enum EnumPlayListType {
    Master = 'master',
    Vod = 'VOD',
    Live = 'live',
}

export type PlayListType = EnumPlayListType.Master | EnumPlayListType.Vod | EnumPlayListType.Live ;
export interface HLSProtocol {
    EXTM3U: string;
    EXT_X_PLAYLIST_TYPE?: PlayListType;
    EXT_X_STREAM_INF?: Array<Record>;
    EXT_X_KEY?: Array<ExtXKey>;
    EXTINF?: Array<Extinf>;
    EXT_X_ENDLIST?: string;
}

/** HLS 协议参数 */
export interface HLSProtocolParam {
    Tag?: EnumProtocolTag;
    Params?: any
}

export interface M3u8Body {
    playlistType: PlayListType;
    // streamInf?: Array<ExtStreamInf>;
    // tsList?: Array<ExtInf>;
}

export interface Record {
    Tag: EnumProtocolTag;
    Attrs: string;
    Value?: string;
}

export interface Extinf extends Record {
    /** 每个切片的实际时长。单位：秒 */
    Duration: number;
    /** 片的描述 */
    Title?: string;
    /** 每片的链接 */
    Url: string;
}

export interface ExtXKey extends Record {
    /** 文件加密方式 */
    METHOD: string;
    /** 密钥链接 */
    URI?: string;
    KEY?: string;
    IV?: string;
}
