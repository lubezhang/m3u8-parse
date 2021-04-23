import { random } from 'lodash';
import { createHash } from 'crypto';

export const getMd5 = (str: string) => {
    const hash = createHash('md5');
    hash.update(str);
    return hash.digest('hex');
}

/**
 * 生成一个唯一标示符
 * @param salter 盐
 */
export const getUUID = (salt: string = '') => {
    return getMd5(salt + random(0.1, 9.9) + Date.now());
}
