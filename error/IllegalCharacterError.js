const Errors = require('./Error')

class IllegalCharacterError extends Errors {
    constructor(position_start, position_end, details) {
        super(position_start, position_end, "Illegal Character Error", details)
    }
}

module.exports = IllegalCharacterError