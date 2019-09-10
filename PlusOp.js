"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberNode_1 = require("./NumberNode");
const Expression_1 = require("./Expression");
class PlusOp extends Expression_1.Expression {
    constructor(left, right) {
        super();
        this.sign = "+";
        this._left = left;
        this._right = right;
    }
    eval() {
        return new NumberNode_1.NumberNode(this._left.eval() + this._right.eval());
    }
}
exports.PlusOp = PlusOp;
//# sourceMappingURL=PlusOp.js.map