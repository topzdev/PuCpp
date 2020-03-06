class BinaryOperator {
    left_node: any;
    right_node: any;
    operator_token: any;

    constructor(left_node: any, operator_token: any, right_node: any) {
        this.left_node = left_node
        this.operator_token = operator_token
        this.right_node = right_node
    }

    represent(): String {
        return `(${this.left_node}, ${this.operator_token}, ${this.right_node})`
    }

}


export default BinaryOperator;