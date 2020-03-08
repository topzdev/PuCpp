import TrackPosition from "../utils/TrackPosition";
import RuntimeError from "../error/RuntimeError";
import INumberError from "../interface/INumberError";
import Context from "../context/Context";


class Number {
    value: number;
    position_start?: TrackPosition;
    position_end?: TrackPosition;
    context?: Context;
    constructor(value: number) {
        this.value = value;
        this.set_position();
        this.set_context();

    }

    set_position(position_start?: TrackPosition, position_end?: TrackPosition) {
        this.position_start = position_start;
        this.position_end = position_end;
        return this;
    }

    set_context(context?: Context) {
        this.context = context;
        return this;
    }

    added_to(other: Number): INumberError | undefined {
        if (other instanceof Number) return {
            result: new Number(this.value + other.value).set_context(this.context), error: undefined
        };
    }

    substracted_by(other: Number): INumberError | undefined {
        if (other instanceof Number) return {
            result: new Number(this.value - other.value).set_context(this.context), error: undefined
        };

    }

    multiplied_by(other: Number): INumberError | undefined {
        if (other instanceof Number) return {
            result: new Number(this.value * other.value).set_context(this.context), error: undefined
        };
    }

    divided_by(other: Number): INumberError | undefined {
        if (other instanceof Number) {
            if (other.value === 0) {
                return {
                    result: undefined, error: new RuntimeError(other.position_start!, other.position_end!, 'Division by zero', this.context!)
                }
            }

            return {
                result: new Number(this.value / other.value).set_context(this.context), error: undefined
            };
        }
    }

    represent() {
        return this.value.toString();
    }
}

export default Number;