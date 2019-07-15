import { VariableNode } from "./VariableNode";
import { NumberNode } from "./NumberNode";
import { Expression } from "./Expression";

export class AssignOp extends Expression {
    protected v : VariableNode;
    protected num : NumberNode;

    constructor(v : VariableNode, num : NumberNode) {
        super()
        this.v = v;
        this.num = num;
    }
}