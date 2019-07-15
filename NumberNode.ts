import { Expression } from "./Expression";

export class NumberNode extends Expression {
    protected _num : number;

    constructor(num : number) {
        super();
        this._num = num;
    }

    get val() : number {
        return this._num;
    }

    set val(newNum : number) {
        this._num = newNum;
    }
}