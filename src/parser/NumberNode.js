class NumberNode {
  constructor(token) {
    this.token = token;
    this.position_start = token.position_start;
    this.position_end = token.position_end;
    return this;
  }
}

module.exports = NumberNode;
