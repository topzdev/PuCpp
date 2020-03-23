const Lexer = require("./Lexer");
const Parser = require("../parser/Parser");
const Context = require("../context/Context");
const Interpreter = require("../interpreter/Interpreter");

class Runner {
  constructor(filename, text) {
    this.filename = filename;
    this.text = text;
  }

  start() {
    let lexer = new Lexer(this.filename, this.text);
    let { tokens, error } = lexer.createTokens();

    if (error) return { tokens: undefined, error };

    let parser = new Parser(tokens);
    let abstractSyntaxTree = parser.parse();

    if (abstractSyntaxTree.error)
      return { tokens: undefined, error: abstractSyntaxTree.error };

    let interpreter = new Interpreter();
    let context = new Context("<program>");
    let result = interpreter.visit(abstractSyntaxTree.node, context);

    if (result.error) return { error: result.error };
    return { result: result.value.value };
  }
}

module.exports = Runner;
