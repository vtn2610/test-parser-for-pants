export class NumberNode {
    protected _num : number;

    constructor(num : number) {
        this._num = num;
    }

    get val() : number {
        return this._num;
    }

    set val(newNum : number) {
        this._num = newNum;
    }
}