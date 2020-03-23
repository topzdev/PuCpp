const RuntimeError = require("../error/RuntimeError");

class Number {
  constructor(value) {
    this.value = value;
    this.set_position();
    this.set_context();
  }

  set_position(position_start, position_end) {
    this.position_start = position_start;
    this.position_end = position_end;
    return this;
  }

  set_context(context) {
    this.context = context;
    return this;
  }

  added_to(other) {
    if (other instanceof Number)
      return {
        result: new Number(this.value + other.value).set_context(this.context),
        error: undefined
      };
  }

  substracted_by(other) {
    if (other instanceof Number)
      return {
        result: new Number(this.value - other.value).set_context(this.context),
        error: undefined
      };
  }

  multiplied_by(other) {
    if (other instanceof Number)
      return {
        result: new Number(this.value * other.value).set_context(this.context),
        error: undefined
      };
  }

  divided_by(other) {
    if (other instanceof Number) {
      if (other.value === 0) {
        return {
          result: undefined,
          error: new RuntimeError(
            other.position_start,
            other.position_end,
            "Division by zero",
            this.context
          )
        };
      }

      return {
        result: new Number(this.value / other.value).set_context(this.context),
        error: undefined
      };
    }
  }

  powered_by(other) {
    if (other instanceof Number) {
      return {
        result: new Number(this.value ** other.value).set_context(this.context),
        error: undefined
      };
    }
  }

  represent() {
    return this.value.toString();
  }
}

module.exports = Number;
