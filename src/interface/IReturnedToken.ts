import IllegalCharacterError from "../error/IllegalCharacterError";

interface IReturnedToken {
    tokens: Array<any> | undefined;
    error: IllegalCharacterError | undefined;
}

export default IReturnedToken;