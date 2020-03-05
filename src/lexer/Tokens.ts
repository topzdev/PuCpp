import ITokenized from "../interface/ITokenized";

class Token {
	private type: string;
	private value: any;

	constructor(type: string, value: any | undefined = undefined) {
		this.type = type
		this.value = value
	}

	represent(): ITokenized {
		return this.value ? { dataType: this.type, value: this.value }
			: { value: this.type }
	}
}


export default Token;