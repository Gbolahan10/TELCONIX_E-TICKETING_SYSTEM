"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEBHOOK_API_KEY = exports.ENDPOINT_SECRET = exports.SECRET_KEY = exports.LOG_DIR = exports.ORIGIN = exports.LOG_FORMAT = exports.DATABASE_URL = exports.PORT = exports.NODE_ENV = exports.CREDENTIALS = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: `.env.${process.env.NODE_ENV || 'development'}` });
exports.CREDENTIALS = process.env.CREDENTIALS === 'true';
exports.NODE_ENV = process.env.NODE_ENV;
exports.PORT = parseInt(process.env.PORT, 10);
exports.DATABASE_URL = process.env.DATABASE_URL;
exports.LOG_FORMAT = process.env.LOG_FORMAT;
exports.ORIGIN = process.env.ORIGIN;
exports.LOG_DIR = process.env.LOG_DIR;
exports.SECRET_KEY = process.env.SECRET_KEY;
exports.ENDPOINT_SECRET = process.env.ENDPOINT_SECRET;
exports.WEBHOOK_API_KEY = process.env.WEBHOOK_API_KEY;
//# sourceMappingURL=index.js.map