import { NumberNode } from "./NumberNode";
import { Expression } from "./Expression";

export class MinusOp extends Expression {   
    public readonly sign = "-";
    private _left : NumberNode;
    private _right: NumberNode;

    constructor(left : NumberNode, right : NumberNode) {
        super();
        this._left = left;
        this._right = right;
    }

    eval() {
        return new NumberNode(this._left.eval() - this._right.eval());
    }
}