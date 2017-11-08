export default function(source) {
    const options = getOptions(this);
    // main idea:
    // find Icon component in sources
    // get props, passed to component (icon, color, size)
    // build path to icon
    // insert smthlike <img src={require('pathToIcon') />
    if (options.cb) {
        options.cb(source);
    }
    return source;
};