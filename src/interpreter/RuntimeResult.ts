import Number from './Number'
import RuntimeError from '../error/RuntimeError';

class RuntimeResult {
    value: Number | undefined;
    error: RuntimeError | undefined;
    constructor() {
        this.value = undefined;
        this.error = undefined;
    }

    register(result: any) {
        if (result.error) this.error = result.error;
        return result.value
    }

    success(value: Number) {
        this.value = value;
        return this;
    }

    failure(error: any) {
        this.error = error;
        return this;
    }
}

export default RuntimeResult;