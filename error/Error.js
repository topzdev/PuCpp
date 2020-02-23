
class Error {
    constructor(position_start, position_end, error_name, details) {
        this.position_start = position_start
        this.position_end = position_end
        this.error_name = error_name
        this.details = details
    }

    errorString() {
        let result = `${this.error_name}: ${this.details} on File ${this.position_start.filename}, line ${this.position_start.line + 1}`

        return result
    }
}

module.exports = Error