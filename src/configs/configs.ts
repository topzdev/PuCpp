// Validations
const DIGITS: Array<string> = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const ARITHMETIC: Array<string> = ['+', '-', '*', '/', '(', ')']
const TAB_AND_SPACE: Array<string> = [' ', '\t']


// Tokens
const TOK_INT: string = 'INTEGER'
const TOK_FLOAT: string = 'FLOAT'
const TOK_PLUS: string = 'PLUS'
const TOK_MINUS: string = 'MINUS'
const TOK_MULTI: string = 'MULTI'
const TOK_DIVI: string = 'DIVISION'
const TOK_LPAREN: string = 'LPAREN'
const TOK_RPAREN: string = 'RPAREN'
const TOK_EOF: string = 'END OF FILE'

export {
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
}