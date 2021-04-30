import { createCipheriv, createDecipheriv, Decipher } from 'crypto';
import * as path from 'path';
import * as fs from 'fs';
import { getTmpFilePath, moveFile, delFile } from '../utils/file';

const CONST_BASE_DEFAULT_ALGORITHM = 'aes-128-cbc';
const CONST_BASE_DEFAULT_IV = '0000000000000000';

/**
 * 对使用AES加密的文件进行解密，默认使用aes-128-cbc解密
 *
 * @deprecated
 * @param srcTsPath 加密的TS文件路径
 * @param key 加密的密钥
 * @param iv 机密偏移量（可选）。默认：0000000000000000
 */
export const decryptFileAesSync = (srcFilePath: string, key: string, iv = CONST_BASE_DEFAULT_IV): void => {
    srcFilePath = path.resolve(srcFilePath);
    if (fs.existsSync(srcFilePath)) {
        const tmpFile = getTmpFilePath();
        try {
            const read = fs.createReadStream(srcFilePath);
            const decipher: Decipher = createDecipheriv(CONST_BASE_DEFAULT_ALGORITHM, key, iv);
            const write: fs.WriteStream = fs.createWriteStream(tmpFile);
            read.pipe<Decipher>(decipher).pipe(write);
            moveFile(tmpFile, srcFilePath)
        } catch (error) {
            delFile(tmpFile);
            throw Error('文件解密失败：' + error)
        }
    } else {
        throw Error('文件不存在：' + srcFilePath);
    }
}

/**
 * 对使用AES加密的文件进行解密，默认使用aes-128-cbc解密
 * @param srcTsPath 加密的TS文件路径
 * @param key 加密的密钥
 * @param iv 机密偏移量（可选）。默认：0000000000000000
 *
 * @returns 解密完成后的文件路径
 */
export const decryptFileAes = (srcFilePath: string, key: string, iv = CONST_BASE_DEFAULT_IV): Promise<string> => {
    srcFilePath = path.resolve(srcFilePath);
    return new Promise((resolve, reject) => {
        if (fs.existsSync(srcFilePath)) {
            const tmpFile = getTmpFilePath();

            const read = fs.createReadStream(srcFilePath);
            const decipher: Decipher = createDecipheriv(CONST_BASE_DEFAULT_ALGORITHM, key, iv);
            const writeStream: fs.WriteStream = fs.createWriteStream(tmpFile);
            read.pipe<Decipher>(decipher).pipe(writeStream);

            writeStream.on('finish', function() { // 写完后，继续读取
                // moveFile(tmpFile, srcFilePath);
                resolve(tmpFile);
            });

            writeStream.on('error', function(error) { // 写完后，继续读取
                delFile(tmpFile);
                reject('文件解密失败：' + error)
            });
        } else {
            reject('文件不存在：' + srcFilePath);
        }
    });
}


export const encryptAes = (data: Buffer, key: string, iv = CONST_BASE_DEFAULT_IV, algorithm = CONST_BASE_DEFAULT_ALGORITHM): Buffer => {
    const aes128 = createCipheriv(algorithm, key, iv);
    aes128.update(data);
    const res = aes128.final();
    return res;
}

export const decryptAes = (data: Buffer, key: string, iv = CONST_BASE_DEFAULT_IV, algorithm = CONST_BASE_DEFAULT_ALGORITHM): Buffer => {
    const decipher = createDecipheriv(algorithm, key, iv);
    decipher.update(data);
    return decipher.final();
}
