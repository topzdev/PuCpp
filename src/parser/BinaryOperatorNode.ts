import Token from "../lexer/Token";
import TrackPosition from "../utils/TrackPosition";

class BinaryOperatorNode {
    left_node: Token;
    right_node: Token;
    operator_token: Token;
    position_start: TrackPosition | undefined;
    position_end: TrackPosition | undefined;

    constructor(left_node: Token, operator_token: Token, right_node: Token) {
        this.left_node = left_node
        this.operator_token = operator_token
        this.right_node = right_node
        this.position_start = left_node.position_start;
        this.position_end = right_node.position_end;
        return this;
    }
}


export default BinaryOperatorNode;