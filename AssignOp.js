"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = require("./Expression");
class AssignOp extends Expression_1.Expression {
    constructor(v, num) {
        super();
        this.v = v;
        this.num = num;
    }
}
exports.AssignOp = AssignOp;
//# sourceMappingURL=AssignOp.js.map