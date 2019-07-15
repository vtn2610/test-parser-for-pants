import { NumberNode } from "./NumberNode";
import { Expression } from "./Expression";

export class PlusOp extends Expression {
    public readonly sign = "+";
    private _left : NumberNode;
    private _right: NumberNode;

    constructor(left : NumberNode, right : NumberNode) {
        super()
        this._left = left;
        this._right = right;
    }
}