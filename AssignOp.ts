import { VariableNode } from "./VariableNode";
import { NumberNode } from "./NumberNode";
import { Expression } from "./Expression";
import { BinOp } from "./BinOp";

export class AssignOp extends Expression {
    protected v : VariableNode;
    protected num : Expression;

    constructor(v : VariableNode, num : Expression) {
        super()
        this.v = v;
        this.num = num;
    }
}