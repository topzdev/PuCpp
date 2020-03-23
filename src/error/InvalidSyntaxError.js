const Error = require("./Error");
class InvalidSyntaxError extends Error {
  constructor(position_start, position_end, details = "") {
    super(position_start, position_end, "Invalid Syntax", details);
  }
}

module.exports = InvalidSyntaxError;
