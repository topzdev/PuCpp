const Token = require("../lexer/Token");
const BinaryOperatorNode = require("../parser/BinaryOperatorNode");
const UnaryOperator = require("../parser/UnaryOperatorNode");
const NumberNode = require("../parser/NumberNode");
const {
  TOK_PLUS,
  TOK_MINUS,
  TOK_MULTI,
  TOK_DIVI
} = require("../configs/configs");
const RuntimeResult = require("./RuntimeResult");
const Number = require("./Number");
const Context = require("../context/Context");

class Interpreter {
  visit(node, context) {
    let method_name = `visit_${node.constructor.name}`;
    // @ts-ignore
    let method = this[method_name] || this.no_visit_method;

    return method.call(this, node);
  }

  no_visit_method(node, context) {
    throw Error(`No visit_${typeof node} method defined`);
  }

  visit_NumberNode(node, context) {
    return new RuntimeResult().success(
      new Number(node.token.value)
        .set_context(context)
        .set_position(node.position_start, node.position_end)
    );
  }

  visit_BinaryOperatorNode(node, context) {
    let result = new RuntimeResult();
    let valid = undefined;
    let left = result.register(this.visit(node.left_node, context));
    if (result.error) return result;

    let right = result.register(this.visit(node.right_node, context));

    if (result.error) return result;

    switch (node.operator_token.type) {
      case TOK_PLUS:
        valid = left.added_to(right);
        break;

      case TOK_MINUS:
        valid = left.substracted_by(right);
        break;

      case TOK_MULTI:
        valid = left.multiplied_by(right);
        break;

      case TOK_DIVI:
        valid = left.divided_by(right);
        break;
    }

    if (valid.error) return result.failure(valid.error);
    else
      return result.success(
        valid.result.set_position(node.position_start, node.position_end)
      );
  }

  visit_UnaryOperatorNode(node, context) {
    let result = new RuntimeResult();
    let valid;
    let number = result.register(this.visit(node.node, context));

    if (result.error) return result;

    if (node.operator_token.type === TOK_MINUS) {
      valid = number.multiplied_by(new Number(-1));
    }

    if (valid.error) {
      return result.failure(valid.error);
    } else {
      return result.success(
        number.set_position(node.position_start, node.position_end)
      );
    }
  }
}

module.exports = Interpreter;
