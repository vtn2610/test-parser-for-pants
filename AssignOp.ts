import { VariableNode } from "./VariableNode";
import { NumberNode } from "./NumberNode";

export class AssignOp {
    protected v : VariableNode;
    protected num : NumberNode;

    constructor(v : VariableNode, num : NumberNode) {
        this.v = v;
        this.num = num;
    }

    // get var() : string {
    //     return this.v.val;
    // }

    // set var(newVar : string) {
    //     this.v.val = newVar;
    // }

    // get num() : string {
    //     return this.val.val;
    // }

    // set num(num : number) {
    //     this.num.val = num;
    // }

}