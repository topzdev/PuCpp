const TrackPosition = require("../utils/TrackPosition");

class Token {
  constructor(
    type,
    value = undefined,
    position_start = undefined,
    position_end = undefined
  ) {
    this.type = type;
    this.value = value;

    if (position_start) {
      this.position_start = position_start.copy();
      this.position_end = position_start.copy();
      this.position_end.next();
    }

    if (position_end) {
      this.position_end = position_end;
    }

    return this;
  }
}

module.exports = Token;
