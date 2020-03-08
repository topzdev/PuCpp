import Token from '../lexer/Token'
import ParseResult from './ParseResult'
import BinaryOperatorNode from './BinaryOperatorNode'
import NumberNode from './NumberNode'
import UnaryOperatorNode from "./UnaryOperatorNode";

import InvalidSyntaxError from "../error/InvalidSyntaxError";

import { TOK_INT, TOK_FLOAT, TOK_MULTI, TOK_DIVI, TOK_PLUS, TOK_MINUS, TOK_EOF, TOK_RPAREN, TOK_LPAREN } from "../configs/configs";

class Parser {
	private tokens: Array<Token>
	private token_index: number;
	private current_token: Token

	constructor(tokens: Array<Token>) {
		// console.log(tokens);
		this.tokens = tokens
		this.token_index = -1;
		this.current_token = undefined!;
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
		if (!result.error && this.current_token.type !== TOK_EOF) {
			return result.failure(new InvalidSyntaxError(this.current_token.position_start!, this.current_token.position_end!, "Expected '+' '-', '*', or '/'"))
		}
		return result;
	}

	private factor() {
		let result = new ParseResult()
		let token = this.current_token


		if ([TOK_PLUS, TOK_MINUS].includes(token.type)) {
			result.register(this.next());

			let factor = result.register(this.factor())

			if (result.error) return result;

			return result.success(new UnaryOperatorNode(token, factor))

		}
		else if ([TOK_INT, TOK_FLOAT].includes(token.type)) {
			result.register(this.next());

			return result.success(new NumberNode(token));

		}
		// ! Fix this issue
		else if (token.type === TOK_LPAREN) {

			result.register(this.next())

			let expression = result.register(this.expression)

			console.log(result);

			if (result.error) return result;
			if (this.current_token.type === TOK_RPAREN) {
				result.register(this.next())
				return result.success(expression);
			}
			else {
				return result.failure(new InvalidSyntaxError(token!.position_start!, token!.position_end!, "Expected Right Parenthesis ')'"))
			}
		}

		return result.failure(new InvalidSyntaxError(token!.position_start!, token!.position_end!, "Expected int or float"))
	}

	private term() {
		return this.binaryOperator(this.factor.bind(this), [TOK_MULTI, TOK_DIVI])
	}

	private expression() {
		return this.binaryOperator(this.term.bind(this), [TOK_PLUS, TOK_MINUS])
	}

	private binaryOperator(func: Function, operator: Array<string>): ParseResult {

		let result = new ParseResult();
		// @ts-ignore
		let leftNode: any = result.register(func())
		if (result.error) return result;

		while (operator.includes(this.current_token.type)) {
			let operationToken = this.current_token;
			result.register(this.next())
			// @ts-ignore
			let rightNode = result.register(func())

			if (result.error) return result;
			leftNode = new BinaryOperatorNode(leftNode, operationToken, rightNode)

		}
		return result.success(leftNode);
	}
}


export default Parser;