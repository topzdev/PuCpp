import Token from "../lexer/Tokens";
import ITokenized from "../interface/ITokenized";

class NumberNode {
	private token: string;
	constructor(token: string) {
		this.token = token
	}

	represent() {
		return `${this.token}`
	}
}

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
		return `(${this.left_node}, ${this.operator_token}, ${this.right_node}`
	}

}


class Parser {
	private tokens: Array<ITokenized>
	private token_index: number;
	private current_token: ITokenized | undefined;

	constructor(tokens: Array<ITokenized>) {
		this.tokens = tokens
		this.token_index = 1
		this.current_token = undefined
		this.next()
	}

	next() {
		this.token_index++

		if (this.token_index < this.tokens.length) {
			this.current_token = this.tokens[this.token_index]
		}
		return this.current_token
	}

	factor() {
		let token = this.current_token

		// if([TOK_INT, TOK_FLOAT] )
	}

	term() {

	}
}