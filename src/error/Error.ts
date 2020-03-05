import TrackPosition from "../utils/TrackPosition";

class Error {
    position_start: TrackPosition;
    position_end: TrackPosition;
    error_name: string;
    details: string;


    constructor(position_start: TrackPosition, position_end: TrackPosition, error_name: string, details: string) {
        this.position_start = position_start
        this.position_end = position_end
        this.error_name = error_name
        this.details = details
    }

    errorString(): string {
        let result = `${this.error_name}: ${this.details} on File ${this.position_start.filename}, line ${this.position_start.line + 1}`

        return result
    }
}

export default Error;