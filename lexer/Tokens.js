class Token {
	constructor(type, value = undefined) {
		this.type = type
		this.value = value
	}

	register() {
		return this.value ? `${this.type}:${this.value}` : `${this.type}`
	}
}


module.exports = Token