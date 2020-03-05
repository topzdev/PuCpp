import Lexer from './Lexer'
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
        let { tokens, error } = lexer.createTokens();

        return { tokens, error }
    }
}

export default Runner;