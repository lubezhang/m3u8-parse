import { HLSProtocolParam, EnumProtocolTag, ProtocolTagType } from '../types';

/**
 * 将字符串形式的协议，解构成方面使用的结构化对象
 * @param strProtocol
 */
export const destructureParams = (strProtocol: string): HLSProtocolParam => {
    const protocol: HLSProtocolParam = {
        Tag: EnumProtocolTag.EXTM3U
    };
    const reg1 = /^#E[A-Z,0-9,-]*:?/;
    if (reg1.test(strProtocol)) {
        // 获取协议中标签的名称
        let arrayProtocol = strProtocol.match(reg1);
        if (arrayProtocol && arrayProtocol[0]) {
            protocol.Tag = arrayProtocol[0].replace(':', '') as ProtocolTagType;
        }

        // 获取协议中的参数
        arrayProtocol = strProtocol.split(reg1);
        let strParams = '';
        if (arrayProtocol.length >= 2) {
            strParams = arrayProtocol[1];
        }
        const arratParams = strParams.split(/,/);
        if (arratParams[0].indexOf('=') >= 0) { // 参数是key：value的形式
            protocol.Params = {};
            arratParams.forEach((item) => {
                if (item) {
                    const tmp = item.split('=');
                    protocol.Params[tmp[0]] = tmp[1].replace(/[',"]/g, ''); // 替换掉数据中的'和"
                }
            });
        } else { // 数组形式的参数
            if (arratParams.some(item => item)) {
                protocol.Params = arratParams;
            } else {
                protocol.Params = undefined;
            }
        }
    } else {
        throw Error('协议格式错误')
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
