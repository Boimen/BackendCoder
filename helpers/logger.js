const log4js = require ("log4js");

log4js.configure({
    appenders: {
        consola: {type: 'console'},
        archivoError: { type: 'file' , filename: '../logs/error.log'},
        archivoWarn: {type: 'file' , filename: '../logs/warn.log'},
        loggerArchivoError: {type : 'logLevelFilter' , appender: 'archivoError' , level: 'error'},
        loggerArchivoWarn: {type: 'logLevelFilter' , appender: 'archivoWarn' , level: 'warn'},
        loggerDebug: {type: 'logLevelFilter' , appender: 'consola' , level: 'debug'}
    },

    categories: {
        default: {
            appenders: ['loggerDebug','loggerArchivoWarn', 'loggerArchivoError'], level: 'all'
        }
    }
})

let logger = null;

logger = log4js.getLogger()

module.exports = logger