import Error from './Error'
import TrackPosition from '../utils/TrackPosition';
class InvalidSyntaxError extends Error {
    constructor(position_start: TrackPosition, position_end: TrackPosition, details: string = '') {
        super(position_start, position_end, 'Invalid Syntax', details);
    }
}

export default InvalidSyntaxError;