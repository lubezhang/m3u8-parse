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

export type ProtocolTagType = EnumProtocolTag.EXTM3U
    | EnumProtocolTag.EXTINF
    | EnumProtocolTag.EXT_X_STREAM_INF
    | EnumProtocolTag.EXT_X_PLAYLIST_TYPE
    | EnumProtocolTag.EXT_X_ENDLIST
    | EnumProtocolTag.EXT_X_KEY
    ;

export type PlayListType = EnumPlayListType.Master | EnumPlayListType.Vod | EnumPlayListType.Live ;
export interface HLSProtocol {
    EXTM3U: string;
    EXT_X_PLAYLIST_TYPE?: PlayListType;
    EXT_X_STREAM_INF?: Array<ExtXStreamInf>;
    EXT_X_KEY?: Array<ExtXKey>;
    EXTINF?: Array<Extinf>;
    EXT_X_ENDLIST?: string;
}

/** HLS 协议参数 */
export interface HLSProtocolParam {
    Tag: ProtocolTagType;
    Params?: any
}


export interface Record {
    /** 协议标签名 */
    Tag: ProtocolTagType;
    /** 协议的原始字符串形式 */
    Attrs: string;
    /** 协议对应的数据。一般是url */
    Value?: string;
}

export interface ExtXStreamInf extends Record {
    BANDWIDTH?: string;
    'PROGRAM-ID'?: string;
    CODECS?: string;
    /** 视频流协议文件链接 */
    Url: string;
}
export interface Extinf extends Record {
    Index?: number;
    /** 每个切片的实际时长。单位：秒 */
    Duration: number;
    /** 片的描述 */
    Title?: string;
    /** 每片的链接 */
    Url: string;
    /** 当前文件在加密信息数组中的索引 */
    EncryptIndex?: number
}

export interface ExtXKey extends Record {
    Index?: number;
    /** 文件加密方式 */
    METHOD: string;
    /** 密钥链接 */
    URI: string;
    KEY?: string;
    IV?: string;
}
/**
 * @deprecated
 */
export interface M3u8Body {
    playlistType: PlayListType;
    // streamInf?: Array<ExtStreamInf>;
    // tsList?: Array<ExtInf>;
}
