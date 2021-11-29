
const logging = (title, message, isError=true) => {
    if (message instanceof String && title instanceof String) console.log(`${title.toUpperCase()} ERROR :::> ${message}\n`)
    else console.log(`${title.toUpperCase()} ${isError ? '--ERROR': '--NO ERROR'} :::> ${JSON.stringify(message)}\n`)
}

module.exports = logging;