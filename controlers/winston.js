const winston = require('winston');

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug:'white'
};

// Configurações de Logs
winston.addColors(colors) //Adicionando cores
const formats = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        ( info ) => `${ info.timestamp } - ${ info.level } - ${ info.message }`
    )
); // Definindo o formato da mensagem

const transportador = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: "logs/error.log",
        level: "error"
    }),
    new winston.transports.File({ filename: "logs/all.log" })
];

const logger = winston.createLogger({
    levels: levels,
    format: formats,
    transports: transportador
});

module.exports = logger;


