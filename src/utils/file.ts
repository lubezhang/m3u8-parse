import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { getUUID } from './string';

/**
 * 获取一个临时文件链接
 */
export const getTmpFilePath = (): string => {
    return path.resolve(os.tmpdir(), getUUID());
}

/**
 * 删除一个文件，不能删除包含文件的目录
 * @param filePath
 */
export const delFile = (filePath: string): void => {
    fs.unlinkSync(filePath); //删除文件
}

/**
 * 移动文件
 * @param srcFile {string} 源文件路径
 * @param distFile {string} 目的文件路径
 */
export const moveFile = (srcFile: string, distFile: string): void => {
    fs.renameSync(srcFile, distFile);
}

/**
 * 复制文件
 * @param srcFile {string} 源文件路径
 * @param distFile {string} 目的文件路径
 */
export const copyFile = (srcFile: string, distFile: string): void => {
    fs.writeFileSync(distFile, fs.readFileSync(srcFile));
}

/**
 * 递归创建目录 同步方法
 * @param folderPath 目录路径
 */
export const mkdirsSync = (folderPath: string): boolean | undefined => {
    if (fs.existsSync(folderPath)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(folderPath))) {
            fs.mkdirSync(folderPath);
            return true;
        }
    }
}

/**
 * 及联删除目录及其里面的文件
 * @param folderPath {string}
 */
export const delDir = (folderPath: string): void => {
    let files: string[];
    if(fs.existsSync(folderPath)){
        files = fs.readdirSync(folderPath);
        files.forEach((file) => {
            const curPath = folderPath + path.sep + file;
            //判断是否是文件夹
            if (fs.statSync(curPath).isDirectory()){
                delDir(curPath); //递归删除文件夹
            } else {
                //是文件的话说明是最后一层不需要递归
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(folderPath);
    }
}
