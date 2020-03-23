const Token = require("../lexer/Token");
const ParseResult = require("./ParseResult");
const BinaryOperatorNode = require("./BinaryOperatorNode");
const NumberNode = require("./NumberNode");
const UnaryOperatorNode = require("./UnaryOperatorNode");
const InvalidSyntaxError = require("../error/InvalidSyntaxError");

const {
  TOK_INT,
  TOK_FLOAT,
  TOK_MULTI,
  TOK_DIVI,
  TOK_PLUS,
  TOK_MINUS,
  TOK_EOF,
  TOK_RPAREN,
  TOK_LPAREN,
  TOK_POW
} = require("../configs/configs");

class Parser {
  constructor(tokens) {
    // console.log(tokens);
    this.tokens = tokens;
    this.token_index = -1;
    this.current_token = undefined;
    this.next();
  }

  next() {
    this.token_index += 1;
    if (this.token_index < this.tokens.length) {
      this.current_token = this.tokens[this.token_index];
    }
    return this.current_token;
  }

  parse() {
    let result = this.expression();
    if (!result.error && this.current_token.type !== TOK_EOF) {
      return result.failure(
        new InvalidSyntaxError(
          this.current_token.position_start,
          this.current_token.position_end,
          "Expected '+' '-', '*', or '/'"
        )
      );
    }
    return result;
  }

  atom() {
    let result = new ParseResult();
    let token = this.current_token;

    if ([TOK_INT, TOK_FLOAT].includes(token.type)) {
      result.register(this.next());

      return result.success(new NumberNode(token));
    }
    // ! Fix this issue
    else if (token.type === TOK_LPAREN) {
      result.register(this.next());

      let expression = result.register(this.expression());
      console.log(expression);

      if (result.error) return result;
      if (this.current_token.type === TOK_RPAREN) {
        result.register(this.next());
        return result.success(expression);
      } else {
        return result.failure(
          new InvalidSyntaxError(
            token.position_start,
            token.position_end,
            "Expected Right Parenthesis ')'"
          )
        );
      }
    }
  }

  power() {
    return this.binaryOperator(this.atom.bind(this), [TOK_POW, ], this.factor.bind(this));
  }

  factor() {
    let result = new ParseResult();
    let token = this.current_token;

    if ([TOK_PLUS, TOK_MINUS].includes(token.type)) {
      result.register(this.next());

      let factor = result.register(this.factor());

      if (result.error) return result;

      return result.success(new UnaryOperatorNode(token, factor));
    } 

    return this.power();
  }

  term() {
    return this.binaryOperator(this.factor.bind(this), [TOK_MULTI, TOK_DIVI]);
  }

  expression() {
    return this.binaryOperator(this.term.bind(this), [TOK_PLUS, TOK_MINUS]);
  }

  binaryOperator(func, operator, func1=undefined) {
    if (func1 === undefined) {
      func1 = func;
    }
    let result = new ParseResult();
    let leftNode = result.register(func());
    if (result.error) return result;

    while (operator.includes(this.current_token.type)) {
      let operationToken = this.current_token;
      result.register(this.next());
      let rightNode = result.register(func1());

      if (result.error) return result;
      leftNode = new BinaryOperatorNode(leftNode, operationToken, rightNode);
    }
    return result.success(leftNode);
  }
}

module.exports = Parser;
