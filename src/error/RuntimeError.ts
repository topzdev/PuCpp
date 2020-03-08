import Error from './Error'
import TrackPosition from '../utils/TrackPosition'
import Context from '../context/Context';

class RuntimeError extends Error {
    context: Context;
    constructor(position_start: TrackPosition, position_end: TrackPosition, details: string, context: Context) {
        super(position_start, position_end, "Runtime Error", details)

        this.context = context;
    }

    errorString(): string {
        let result = this.generateStackTrace();
        result += `${this.error_name}: ${this.details} on File ${this.position_start.filename}, line ${this.position_start.line + 1}`

        return result
    }

    generateStackTrace(): string {
        let result = '';
        let position = this.position_start;
        let context = this.context;

        while (context) {
            result = `File ${position.filename}, line ${position.line + 1}, in ${context.display_name}\n ${result}`

            position = context.parent_entry_position!;
            context = context.parent!;

        }

        return `Traceback (most recent call last): \n ${result}`
    }
}

export default RuntimeError;