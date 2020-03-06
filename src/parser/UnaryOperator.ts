class UnaryOperator {
    private operator_token: any;
    private node: any;

    constructor(operator_token: any, node: any) {
        this.operator_token = operator_token
        this.node = node;
    }

    represent() {
        return `(${this.operator_token}, ${this.node})`
    }
}

export default UnaryOperator;