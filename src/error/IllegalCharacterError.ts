import Error from './Error'
import TrackPosition from '../utils/TrackPosition'

class IllegalCharacterError extends Error {
    constructor(position_start: TrackPosition, position_end: TrackPosition, details: string) {
        super(position_start, position_end, "Illegal Character Error", details)
    }
}

export default IllegalCharacterError;