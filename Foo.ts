import { VariableNode } from "./VariableNode";
import { Expression } from "./Expression";

export class Foo extends Expression {
      private _val : VariableNode[]; 
      constructor(val : VariableNode[]) {
          super();
          this._val = val;
      }
}