function loggerBuilder(prefix) {
    return function (text) {
        console.log(`${prefix}: ${text}`);
    };
}

module.exports = { loggerBuilder };