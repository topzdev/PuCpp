import TrackPosition from "../utils/TrackPosition";
import Token from "../lexer/Token";

class NumberNode {
    token: Token;
    position_start: TrackPosition | undefined;
    position_end: TrackPosition | undefined;
    constructor(token: Token) {
        this.token = token
        this.position_start = token.position_start;
        this.position_end = token.position_end;
        return this;
    }
}

export default NumberNode;