const Lexer = require('./Lexer')

const run = (filename, text) => {
    let lexer = new Lexer(filename, text)
    let { tokens, error } = lexer.createTokens()

    return { tokens, error }
}


module.exports = run