const Token = require("./Token");
const IllegalCharacterError = require("../error/IllegalCharacterError");
const TrackPosition = require("../utils/TrackPosition");
const {
  DIGITS,
  ARITHMETIC,
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
} = require("../configs/configs");

class Lexer {
  /**
   * Lexer class checking the all posible tokens in your given string
   */
  constructor(filename, text) {
    this.filename = filename;
    this.text = text;
    this.position = new TrackPosition(-1, 0, -1, filename);
    this.current_char = undefined;
    this.next();
  }

  /**
   * advance to next character in your given text
   */
  next() {
    this.position.next(this.current_char);
    this.current_char =
      this.position.index < this.text.length
        ? this.text[this.position.index]
        : undefined;
  }

  /**
   * check the token from the given text and return the validated token
   */
  createTokens() {
    let tokens = [];
    while (this.current_char != undefined) {
      // includes = is a array method that check if the current character is exisiting in TAB_AND_SPACE
      if (TAB_AND_SPACE.includes(this.current_char)) {
        this.next();
      } else if (DIGITS.includes(this.current_char)) {
        tokens.push(this.numberCheck());
      } else if (ARITHMETIC.includes(this.current_char)) {
        tokens.push(this.arithmeticCheck());
        this.next();
      } else {
        let character = this.current_char;
        let position_start = this.position.copy();

        this.next();

        return {
          tokens: [],
          error: new IllegalCharacterError(
            position_start,
            this.position,
            `'${character}'`
          )
        };
      }
    }
    tokens.push(new Token(TOK_EOF, undefined, this.position));
    return { tokens, error: undefined };
  }

  arithmeticCheck() {
    let token;

    if (this.current_char === "+") token = new Token(TOK_PLUS);
    else if (this.current_char === "-")
      token = new Token(TOK_MINUS, undefined, this.position);
    else if (this.current_char === "*")
      token = new Token(TOK_MULTI, undefined, this.position);
    else if (this.current_char === "/")
      token = new Token(TOK_DIVI, undefined, this.position);
    else if (this.current_char === "(")
      token = new Token(TOK_LPAREN, undefined, this.position);
    else if (this.current_char === ")")
      token = new Token(TOK_RPAREN, undefined, this.position);

    return token;
  }

  numberCheck() {
    let num_str = "";
    let dot_count = 0;
    let position_start = this.position.copy();
    // ... = spread operator
    while (
      this.current_char != undefined &&
      [".", ...DIGITS].includes(this.current_char)
    ) {
      if (this.current_char === ".") {
        if (dot_count == 1) break;

        dot_count += 1;
        num_str += ".";
      } else {
        num_str += this.current_char;
      }

      this.next();
    }

    if (dot_count === 0) {
      return new Token(
        TOK_INT,
        parseInt(num_str),
        position_start,
        this.position
      );
    } else {
      return new Token(
        TOK_FLOAT,
        parseFloat(num_str),
        position_start,
        this.position
      );
    }
  }
}

module.exports = Lexer;
