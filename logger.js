const log4js = require ("log4js");

log4js.configure({
    appenders: {
        consola: {type: 'console'},
        archivoError: { type: 'file' , filename: 'error.log'},
        archivoWarn: {type: 'file' , filename: 'warn.log'},
        loggerArchivoError: {type : 'logLevelfilter' , appender: 'archivoError' , level: 'error'},
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