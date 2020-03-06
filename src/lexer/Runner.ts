import Lexer from './Lexer'
import Parser from '../parser/Parser';
import IReturnedToken from '../interface/IReturnedToken';

class Runner {
    filename: string;
    text: string;

    constructor(filename: string, text: string) {
        this.filename = filename;
        this.text = text;
    }

    start(): IReturnedToken {
        let lexer: Lexer = new Lexer(this.filename, this.text)
        let { tokens, error }: IReturnedToken = lexer.createTokens();

        if (error) return { tokens: undefined, error };

        let parser = new Parser(tokens!);
        let ast = parser.parse();

        return { tokens: ast.node, error: ast.error }
    }
}

export default Runner;