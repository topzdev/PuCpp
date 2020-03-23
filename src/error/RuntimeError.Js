const Error = require("./Error");
const TrackPosition = require("../utils/TrackPosition");
const Context = require("../context/Context");

class RuntimeError extends Error {
  constructor(position_start, position_end, details, context) {
    super(position_start, position_end, "Runtime Error", details);

    this.context = context;
  }

  errorString() {
    let result = this.generateStackTrace();
    result += `${this.error_name}: ${this.details} on File ${
      this.position_start.filename
    }, line ${this.position_start.line + 1}`;

    return result;
  }

  generateStackTrace() {
    let result = "";
    let position = this.position_start;
    let context = this.context;

    while (context) {
      result = `File ${position.filename}, line ${position.line + 1}, in ${
        context.display_name
      }\n ${result}`;

      position = context.parent_entry_position;
      context = context.parent;
    }

    return `Traceback (most recent call last): \n ${result}`;
  }
}

module.exports = RuntimeError;
