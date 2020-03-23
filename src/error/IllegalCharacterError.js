const Error = require("./Error");
const TrackPosition = require("../utils/TrackPosition");

class IllegalCharacterError extends Error {
  constructor(position_start, position_end, details) {
    super(position_start, position_end, "Illegal Character Error", details);
  }
}

module.exports = IllegalCharacterError;
