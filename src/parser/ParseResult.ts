class ParseResult {
    public error: any;
    public node: any;
    constructor() {
        this.error = undefined;
        this.node = undefined;
    }

    public register(result: any) {
        if (result instanceof ParseResult) {
            if (result.error) this.error = result.error;
            return result.node;
        }

        return result;
    }

    public success(node: any) {
        this.node = node;
        return this;
    }

    public failure(error: any) {
        this.error = error;
        return this;
    }
}

export default ParseResult;