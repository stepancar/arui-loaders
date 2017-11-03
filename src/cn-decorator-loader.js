import { getOptions } from 'loader-utils';
const path = require('path');
if (!String.prototype.splice) {
    /**
     * {JSDoc}
     *
     * The splice() method changes the content of a string by removing a range of
     * characters and/or adding new characters.
     *
     * @this {String}
     * @param {number} start Index at which to start changing the string.
     * @param {number} delCount An integer indicating the number of old chars to remove.
     * @param {string} newSubStr The String that is spliced in.
     * @return {string} A new string with the spliced substring.
     */
    String.prototype.splice = function(start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}
export default function(source) {
    const options = getOptions(this);
    const dirName = path.dirname(this.resourcePath).split(path.sep).pop();
    const importStr = `import cn from 'arui-feather/cn';\n`;
    source = source.splice(0, 0, importStr);
    const decoratorStr = `import './index.css';\n\n@cn('${dirName}')\n`;
    const exportIndex = source.indexOf('export default class');//- 'export default class'.length;
    source = source.splice(exportIndex, 0, decoratorStr)
        .replace('className={ cn }', 'className={ cn() }');
    if (options.cb) {
        options.cb(source);
    }
    return source;
};