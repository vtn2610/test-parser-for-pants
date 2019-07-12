export class VariableNode {
    private _value : string;
    constructor(val : string) {
        this._value = val;
    }

    set val(newVal:string) {
        this._value = newVal;
    }

    get val() : string {
        return this._value;
    }

    toString() : string {
        return this._value;
    }

}