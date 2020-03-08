import Token from "../lexer/Token";
import BinaryOperatorNode from "../parser/BinaryOperatorNode";
import UnaryOperator from "../parser/UnaryOperatorNode";
import NumberNode from "../parser/NumberNode";
import { TOK_PLUS, TOK_MINUS, TOK_MULTI, TOK_DIVI } from "../configs/configs";
import RuntimeResult from "./RuntimeResult";
import Number from './Number'
import INumberError from "../interface/INumberError";
import Context from "../context/Context";

interface IValid {
    error: any,
    validResult: Number | undefined;
}

class Interpreter {

    visit(node: Token, context: Context): RuntimeResult {
        let method_name = `visit_${node.constructor.name}`
        // @ts-ignore
        let method = this[method_name] || this.no_visit_method

        return method.call(this, node);
    }

    no_visit_method(node: Token, context: Context) {
        throw Error(`No visit_${typeof node} method defined`)
    }

    visit_NumberNode(node: NumberNode, context: Context): RuntimeResult {
        return new RuntimeResult().success(new Number(node.token.value).set_context(context).set_position(node.position_start!, node.position_end!))
    }

    visit_BinaryOperatorNode(node: BinaryOperatorNode, context: Context): RuntimeResult {
        let result = new RuntimeResult();
        let valid: INumberError | undefined = undefined;
        let left = result.register(this.visit(node.left_node, context));
        if (result.error) return result;

        let right = result.register(this.visit(node.right_node, context));

        if (result.error) return result;


        switch (node.operator_token.type) {
            case TOK_PLUS:
                valid = left.added_to(right);
                break;

            case TOK_MINUS:
                valid = left.substracted_by(right);
                break;

            case TOK_MULTI:
                valid = left.multiplied_by(right)
                break;

            case TOK_DIVI:
                valid = left.divided_by(right);
                break;
        }


        if (valid!.error) return result.failure(valid!.error);

        else return result.success(valid!.result!.set_position(node.position_start!, node.position_end!));


    }

    visit_UnaryOperatorNode(node: UnaryOperator, context: Context): RuntimeResult {
        let result = new RuntimeResult();
        let valid: INumberError | undefined;
        let number: Number = result.register(this.visit(node.node, context))

        if (result.error) return result;

        if (node.operator_token.type === TOK_MINUS) {
            valid = number.multiplied_by(new Number(-1))!
        }

        if (valid!.error) {
            return result.failure(valid!.error);
        }
        else {
            return result.success(number.set_position(node.position_start!, node.position_end!));
        }
    }

}

export default Interpreter;