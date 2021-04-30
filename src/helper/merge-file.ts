import * as path from 'path';
import * as fs from 'fs';
import { CONST_FILE_DECRYPT_TEMP_DIR } from '../common/constants';
import { ExtXKey } from '../types';
import { decryptFileAes } from '../parse';
import { copyFile, mkdirsSync, moveFile } from '../utils/file';

export const mergePiece = async (piecePath: string, outputFile: string, encrypt?: ExtXKey): Promise<string> => {
    piecePath = path.resolve(piecePath);
    outputFile = path.resolve(outputFile);
    try {
        for (let index = 0; true; index++) {
            const pieceFile = path.join(piecePath, `${index}.ts`)
            // 如果没有分片文件，停止合并文件
            if (!fs.existsSync(pieceFile)) {
                break;
                // throw Error('分片文件路径');
            }
            // 文件需要解密
            const pieceTmpPath = path.join(piecePath, CONST_FILE_DECRYPT_TEMP_DIR);
            const pieceTmpFile = path.join(pieceTmpPath, `${index}.ts`);
            if (encrypt && encrypt.KEY) {
                // 将待解密文件复制的临时目录中
                if (!fs.existsSync(pieceTmpPath)) {
                    mkdirsSync(pieceTmpPath);
                }
                copyFile(pieceFile, pieceTmpFile)
                // b03cf986f889fabe
                await decryptFileAes(pieceTmpFile, encrypt.KEY);
            } else {
                moveFile(pieceFile, pieceTmpFile)
            }
        }
    } catch (error) {
        throw Error('合并文件异常：' + error);
        // reject('合并文件异常：' + error);
    }
    return outputFile;
}

export const mergeFile = (pieceTmpPath: string, fileName: string): void => {
    pieceTmpPath = path.resolve(pieceTmpPath);
    const outputFile =  path.resolve(fileName)
    if (!fs.existsSync(pieceTmpPath)) {
        throw Error('分片文件路径错误');
    }
    for (let index = 0; true; index++) {
        const pieceFile = path.join(pieceTmpPath, `${index}.ts`)
        // 如果没有分片文件，停止合并文件
        if (!fs.existsSync(pieceFile)) {
            break;
            // throw Error('分片文件路径');
        }
        fs.appendFileSync(outputFile, fs.readFileSync(pieceFile));
    }
}
