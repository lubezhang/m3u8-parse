export interface Encryption {
    /** 文件加密方式 */
    method: string;
    /** 密钥链接 */
    uri?: string;
    key?: string;
    iv?: string;
}
