class ParseResult {
  constructor() {
    this.error = undefined;
    this.node = undefined;
  }

  register(result) {
    if (result instanceof ParseResult) {
      if (result.error) this.error = result.error;
      return result.node;
    }

    return result;
  }

  success(node) {
    this.node = node;
    return this;
  }

  failure(error) {
    this.error = error;
    return this;
  }
}

module.exports = ParseResult;
