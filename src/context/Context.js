const TrackPosition = require("../utils/TrackPosition");

class Context {
  constructor(display_name, parent, parent_entry_position) {
    this.display_name = display_name;
    this.parent = parent;
    this.parent_entry_position = parent_entry_position;

    return this;
  }
}

module.exports = Context;
