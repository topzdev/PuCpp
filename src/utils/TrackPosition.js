class TrackPosition {
  /**
   * TrackPosition class determine where the error or warning occurs in your code
   */
  constructor(index, line, column, filename, filetext) {
    this.index = index;
    this.line = line;
    this.column = column;
    this.filename = filename;
    this.filetext = filetext;
  }
  /**
   * Advance to the next current character
   */
  next(current_char = undefined) {
    this.index += 1;
    this.column += 1;

    if (current_char === "\n") {
      this.line += 1;
      this.column = 0;
    }

    return this;
  }

  /**
   * This get the position of where the error occur
   */
  copy() {
    return new TrackPosition(
      this.index,
      this.line,
      this.column,
      this.filename,
      this.filetext
    );
  }
}

module.exports = TrackPosition;
