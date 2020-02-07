"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ConfigurationParsingException extends Error {
  constructor(_filePath) {
    super(`Error reading configuration file ${_filePath}`);
    this.filePath = _filePath;
    Error.captureStackTrace(this, ConfigurationParsingException);
  }

}

exports.default = ConfigurationParsingException;
module.exports = exports.default;