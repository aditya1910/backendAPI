const winston = require('winston');
require('winston-daily-rotate-file');

function getLogger(module) {
	const transport = new winston.transports.DailyRotateFile({
		filename: './logs/log',
		datePattern: 'yyyy-MM-dd.',
		prepend: true,
		level: process.env.ENV === 'development' ? 'silly' : 'error',
	});

	// const logger = new (winston.Logger)({
	//   transports: [
	//     transport,
	//   ],
	// });

	const logger = winston.createLogger({
		transports: [transport],
	});

	return logger;
}

module.exports = getLogger;