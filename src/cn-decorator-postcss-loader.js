import { getOptions } from 'loader-utils';
import path from 'path';

export default function (source) {
    const options = getOptions(this);
    const dirName = path.dirname(this.resourcePath).split(path.sep).pop();
    source = `.${dirName} {\n    ${source.replace(/\n/g, '\n    ')}\n}\n`;
    if (options.cb) {
        options.cb(source);
    }
    return source;
};