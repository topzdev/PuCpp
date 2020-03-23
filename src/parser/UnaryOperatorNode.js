class UnaryOperatorNode {
  constructor(operator_token, node) {
    this.operator_token = operator_token;
    this.node = node;
    this.position_start = this.operator_token.position_start;
    this.position_end = node.position_end;
    return this;
  }
}

module.exports = UnaryOperatorNode;
