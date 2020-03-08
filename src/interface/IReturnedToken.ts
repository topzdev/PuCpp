import IllegalCharacterError from "../error/IllegalCharacterError";
import Token from "../lexer/Token";

interface IReturnedToken {
    tokens: Array<Token> | undefined;
    error: IllegalCharacterError | undefined;
}

export default IReturnedToken;