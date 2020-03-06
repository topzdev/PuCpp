class NumberNode {
    private token: string;
    constructor(token: string) {
        this.token = token
    }

    represent() {
        return `${this.token}`
    }
}

export default NumberNode;