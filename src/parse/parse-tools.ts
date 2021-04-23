import { HLSProtocolParam, EnumProtocolTag } from '../types';
/**
 * 将字符串形式的协议，解构成方面使用的结构化对象
 * @param strParams
 */
export const destructureParams = (strParams: string): HLSProtocolParam => {
    const protocol: HLSProtocolParam = {}
    if (strParams && typeof strParams === 'string') {
        if (strParams.charAt(0) !== '#') {
            return protocol;
        }
        const types = strParams.split(':');
        if (Array.isArray(types) && types.length > 0) {
            protocol.Tag = types[0] as EnumProtocolTag; // 解析标签
            if (types.length > 1) { // 解析参数
                types[1] = strParams.replace(`${protocol.Tag}:`, '')
                const params = types[1].split(',');
                let protocolParams: any;
                if (params[0].indexOf('=') >= 0) { // 参数是key：value的形式
                    protocolParams = {};
                    params.forEach((item) => {
                        if (item) {
                            const tmp = item.split('=');
                            protocolParams[tmp[0]] = tmp[1].replace(/[',"]/g, '');
                        }
                    });
                } else { // 数组形式的参数
                    protocolParams = params;
                }

                protocol.Params = protocolParams;
            }
        } else {
            return protocol;
        }
    } else {
        throw Error('参数为空，格式错误');
    }

    return protocol;
}

/**
 * 将字符串形式的文件内容转成一行一个元素的数组
 * @param constent 字符串形式的文件内容
 */
export const structureContent = (constent: string): Array<string> => {
    let res: Array<string> = [];
    res = constent.split('\n');
    res = cleanBlankLine(res);
    return res;
}

/**
 * 清理数据中的空行
 * @param list
 */
export const cleanBlankLine = (list: Array<string>): Array<string> => {
    const resList: Array<string> = [];
    list.forEach(item => {
        if (item) {
            resList.push(item);
        }
    });

    return resList;
}

/**
 * 解析ts链接地址。兼容绝对路径和相对路径
 * @param playUrl TS链接
 * @param baseUrl 主文件链接
 */
export const joinUrl = (playUrl: string, baseUrl?: string): string => {
    let url = playUrl;
    if (baseUrl) {
        const baseUrlParse = new URL(baseUrl);
        if (/^https?:\/\//g.test(playUrl)) { // 绝对路径
            url = playUrl;
        } else if (/^\//g.test(playUrl)) { // 相对路径，从域名的根开始
            url = baseUrlParse.origin + playUrl;
        } else { // 相对路径，从当前链接地址开始
            const urlList = baseUrlParse.pathname.split('/');
            urlList.pop();
            url = baseUrlParse.origin + urlList.join('/') + '/' + playUrl;
        }
    }
    return url;
}
