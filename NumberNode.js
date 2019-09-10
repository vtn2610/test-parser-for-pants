"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = require("./Expression");
class NumberNode extends Expression_1.Expression {
    constructor(num) {
        super();
        this._num = num;
    }
    get val() {
        return this._num;
    }
    set val(newNum) {
        this._num = newNum;
    }
    eval() {
        return this._num;
    }
}
exports.NumberNode = NumberNode;
//# sourceMappingURL=NumberNode.js.map