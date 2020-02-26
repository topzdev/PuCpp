class TrackPosition {
    /**
     * TrackPosition class determine where the error or warning occurs in your code
     * 
     * @param {number} index current index occur
     * @param {number} line current line occur
     * @param {number} column  current column occur
     * @param {string} filename  current filename occur
     * @param {string} filetext  current filetext occur
     * @returns {this} from TrackPosition
     */
    constructor(index, line, column, filename, filetext) {
        this.index = index
        this.line = line
        this.column = column
        this.filename = filename
        this.filetext = filetext
    }
    /**
     * Advance to the next current character
     * 
     * @param current_char 
     * @returns {this} from TrackPosition
     */
    next(current_char) {
        this.index += 1
        this.column += 1

        if (current_char === '\n') {
            this.column += 0
            this.line += 1
        }

        return this
    }

    /**
     * This get the position of where the error occur
     * 
     * @returns TrackPosition
     */
    register() {
        return new TrackPosition(this.index, this.line, this.column, this.filename, this.filetext)
    }

}

module.exports = TrackPosition