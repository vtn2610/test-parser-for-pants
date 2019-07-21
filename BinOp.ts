import { Expression } from "./Expression";
import { NumberNode } from "./NumberNode";

export interface BinOp extends Expression {
    eval() : NumberNode;
}