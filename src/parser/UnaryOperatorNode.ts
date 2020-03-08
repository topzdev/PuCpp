import TrackPosition from "../utils/TrackPosition";
import Token from "../lexer/Token";

class UnaryOperatorNode {
    operator_token: Token;
    node: any;
    position_start: TrackPosition | undefined;
    position_end: TrackPosition | undefined;

    constructor(operator_token: any, node: Token) {
        this.operator_token = operator_token
        this.node = node;
        this.position_start = this.operator_token.position_start;
        this.position_end = node.position_end;
        return this;
    }
}

export default UnaryOperatorNode;