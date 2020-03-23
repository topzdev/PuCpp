class BinaryOperatorNode {
  constructor(left_node, operator_token, right_node) {
    this.left_node = left_node;
    this.operator_token = operator_token;
    this.right_node = right_node;
    this.position_start = left_node.position_start;
    this.position_end = right_node.position_end;
    return this;
  }
}

module.exports = BinaryOperatorNode;
