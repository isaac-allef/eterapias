module.exports = {
    mergeStringArray(string, array) {
        return array.map(item => string+item);
    },

    stringToArray(string, splitBy=',') {
        return string.split(splitBy);
    }
}