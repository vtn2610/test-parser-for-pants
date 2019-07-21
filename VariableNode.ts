import { Expression } from "./Expression";

export class VariableNode extends Expression {
    private _value : string;
    constructor(val : string) {
        super();
        this._value = val;
    }

    set val(newVal:string) {
        this._value = newVal;
    }

    eval() : string {
        return this._value;
    }

    toString() : string {
        return this._value;
    }

}