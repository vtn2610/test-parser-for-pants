"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = require("./Expression");
class PlusOp extends Expression_1.Expression {
    constructor(left, right) {
        super();
        this.sign = "+";
        this._left = left;
        this._right = right;
    }
}
exports.PlusOp = PlusOp;
//# sourceMappingURL=PlusOp.js.map