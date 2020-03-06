import ITokenized from "../interface/ITokenized";
import ParseResult from './ParseResult'
import BinaryOperator from './BinaryOperator'
import NumberNode from './NumberNode'

import InvalidSyntaxError from "../error/InvalidSyntaxError";

import { TOK_INT, TOK_FLOAT, TOK_MULTI, TOK_DIVI, TOK_PLUS, TOK_MINUS, TOK_EOF, TOK_RPAREN, TOK_LPAREN } from "../configs/configs";
import UnaryOperator from "./UnaryOperator";

class Parser {
	private tokens: Array<ITokenized>
	private token_index: number;
	private current_token: ITokenized | undefined;

	constructor(tokens: Array<ITokenized>) {
		console.log(tokens);
		this.tokens = tokens
		this.token_index = -1;
		this.current_token = undefined
		this.next()
	}

	next() {
		this.token_index += 1;
		if (this.token_index < this.tokens.length) {
			this.current_token = this.tokens[this.token_index]
		}
		return this.current_token
	}

	public parse(): ParseResult {
		let result = this.expression();
		// console.log(result, this.current_token?.position_start);
		if (!result.error && this.current_token?.dataType !== TOK_EOF) {
			return result.failure(new InvalidSyntaxError(this.current_token?.position_start!, this.current_token?.position_end!, "Expected '+' '-', '*', or '/'"))
		}

		return result;
	}

	private factor() {
		let result = new ParseResult()
		let token = this.current_token


		if ([TOK_PLUS, TOK_MINUS].includes(token?.dataType)) {
			result.register(this.next());

			let factor = result.register(this.factor())

			if (result.error) return result;

			return result.success(new UnaryOperator(token?.dataType, factor).represent())

		} else if ([TOK_INT, TOK_FLOAT].includes(token?.dataType)) {
			result.register(this.next());

			return result.success(new NumberNode(token?.value).represent());

		} else if (token?.dataType === TOK_LPAREN) {
			// ! Fix this issue
			result.register(this.next())

			let expression = result.register(this.expression)

			console.log(this.current_token, result.error)
			if (result.error) return result;
			if (this.current_token?.dataType === TOK_RPAREN) {
				result.register(this.next())
				return result.success(expression);
			} else {
				return result.failure(new InvalidSyntaxError(token!.position_start!, token!.position_end!, "Expected Right Parenthesis ')'"))
			}
		}

		return result.failure(new InvalidSyntaxError(token!.position_start!, token!.position_end!, "Expected int or float"))
	}

	private term(): ParseResult {
		let result = new ParseResult();
		let leftNode: any = result.register(this.factor())

		if (result.error) return result;

		while ([TOK_MULTI, TOK_DIVI].includes(this.current_token?.dataType)) {
			let operationToken = this.current_token;
			result.register(this.next())
			let rightNode = result.register(this.factor())

			if (result.error) return result;
			leftNode = new BinaryOperator(leftNode, operationToken?.dataType, rightNode).represent();
		}
		return result.success(leftNode);
	}

	private expression(): ParseResult {
		let result = new ParseResult();
		let leftNode: any = result.register(this.term())

		if (result.error) return result;

		while ([TOK_PLUS, TOK_MINUS].includes(this.current_token?.dataType)) {
			let operationToken = this.current_token;
			result.register(this.next())
			let rightNode = result.register(this.term())

			if (result.error) return result;
			leftNode = new BinaryOperator(leftNode, operationToken?.dataType, rightNode).represent();
		}
		return result.success(leftNode);

	}
}


export default Parser;