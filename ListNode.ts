import { NumberNode } from "./NumberNode";
import { Expression } from "./Expression";

export class ListNode extends Expression {
    private _val : NumberNode[]; 
      constructor(val : NumberNode[]) {
          super();
          this._val = val;
      }
}