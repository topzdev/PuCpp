import IllegalCharacterError from "../error/IllegalCharacterError";
import ITokenized from "./ITokenized";

interface IReturnedToken {
    tokens: Array<any> | undefined;
    error: IllegalCharacterError | undefined;
}

export default IReturnedToken;