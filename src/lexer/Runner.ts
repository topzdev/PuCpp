import Lexer from './Lexer'
import Parser from '../parser/Parser';
import IReturnedToken from '../interface/IReturnedToken';
import Interpreter from '../interpreter/Interpreter';
import Context from '../context/Context';

class Runner {
    filename: string;
    text: string;

    constructor(filename: string, text: string) {
        this.filename = filename;
        this.text = text;
    }

    start() {
        let lexer: Lexer = new Lexer(this.filename, this.text)
        let { tokens, error }: IReturnedToken = lexer.createTokens();

        if (error) return { tokens: undefined, error };

        let parser = new Parser(tokens!);
        let abstractSyntaxTree = parser.parse();

        if (abstractSyntaxTree.error) return { tokens: undefined, error: abstractSyntaxTree.error };

        let interpreter = new Interpreter();
        let context = new Context('<program>');
        let result = interpreter.visit(abstractSyntaxTree.node, context);

        if (result.error) return { error: result.error }
        return { result: result.value?.value }
    }
}

export default Runner;