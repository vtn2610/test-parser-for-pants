"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = require("./Expression");
class VariableNode extends Expression_1.Expression {
    constructor(val) {
        super();
        this._value = val;
    }
    set val(newVal) {
        this._value = newVal;
    }
    eval() {
        return this._value;
    }
    toString() {
        return this._value;
    }
}
exports.VariableNode = VariableNode;
//# sourceMappingURL=VariableNode.js.map