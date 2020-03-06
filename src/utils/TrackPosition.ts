class TrackPosition {
    index: number;
    line: number;
    column: number;
    filename: string;
    filetext?: string;
    /**
     * TrackPosition class determine where the error or warning occurs in your code
     */
    constructor(index: number, line: number, column: number, filename: string, filetext?: string) {
        this.index = index
        this.line = line
        this.column = column
        this.filename = filename
        this.filetext = filetext
    }
    /**
     * Advance to the next current character
     */
    public next(current_char?: string | undefined) {
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
     */
    public copy() {
        return new TrackPosition(this.index, this.line, this.column, this.filename, this.filetext)
    }

}

export default TrackPosition