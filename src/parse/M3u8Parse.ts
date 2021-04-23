import { parse } from './index';
import { getUUID } from '../utils';

export default class M3u8Parse {
    private _m3u8Content: string;
    private _key: string = getUUID();

    public get key(): string {
        return this._key;
    }
    public set key(value: string) {
        this._key = value;
    }

    public get m3u8Content(): string {
        return this._m3u8Content;
    }
    /**
     * m3u8文件内容
     * @param m3u8Content
     */
    constructor (m3u8Content: string) {
        this._m3u8Content = m3u8Content;
        parse(m3u8Content);
    }
}
