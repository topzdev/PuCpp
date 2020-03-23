// Validations
const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const ARITHMETIC = ["+", "-", "*", "/", "(", ")"];
const TAB_AND_SPACE = [" ", "\t"];

// Tokens
const TOK_INT = "INTEGER";
const TOK_FLOAT = "FLOAT";
const TOK_PLUS = "PLUS";
const TOK_MINUS = "MINUS";
const TOK_MULTI = "MULTI";
const TOK_DIVI = "DIVISION";
const TOK_LPAREN = "LPAREN";
const TOK_RPAREN = "RPAREN";
const TOK_EOF = "END OF FILE";

module.exports = {
  ARITHMETIC,
  DIGITS,
  TAB_AND_SPACE,
  TOK_INT,
  TOK_FLOAT,
  TOK_PLUS,
  TOK_MINUS,
  TOK_MULTI,
  TOK_DIVI,
  TOK_LPAREN,
  TOK_RPAREN,
  TOK_EOF
};
