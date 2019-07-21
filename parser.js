"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../pants/lib");
const AssignOp_1 = require("./AssignOp");
const NumberNode_1 = require("./NumberNode");
const VariableNode_1 = require("./VariableNode");
const PlusOp_1 = require("./PlusOp");
const MinusOp_1 = require("./MinusOp");
const ListNode_1 = require("./ListNode");
const Foo_1 = require("./Foo");
var Prims = lib_1.Primitives;
var CharStream = lib_1.CharUtil.CharStream;
const Translator_1 = require("../pants/lib/Errors/Translator");
let keyWordParser = Prims.seq(Prims.right(Prims.ws())(Prims.str("var")))(Prims.ws1())((tup) => CharStream.concat([tup[0], tup[1]]));
let variableParse = Prims.right(keyWordParser)(Prims.appfun(Prims.many1(Prims.letter()))((ltr) => new VariableNode_1.VariableNode(ltr.join(""))));
let numberParser = Prims.appfun(Prims.between(Prims.ws())(Prims.ws())(Prims.many1(Prims.digit())))((digitarray) => new NumberNode_1.NumberNode(parseFloat(digitarray.join(""))));
let plusParser = Prims.seq(numberParser)(Prims.right(Prims.char("+"))(numberParser))((tup) => new PlusOp_1.PlusOp(tup[0], tup[1]));
let minusParser = Prims.seq(numberParser)(Prims.right(Prims.char("-"))(numberParser))((tup) => new MinusOp_1.MinusOp(tup[0], tup[1]));
let assignParser = Prims.seq(Prims.left(variableParse)(Prims.right(Prims.ws())(Prims.char('='))))(Prims.choices(plusParser, minusParser))((tup) => new AssignOp_1.AssignOp(tup[0], tup[1]));
let multiVariableparser = Prims.seq(variableParse)(Prims.many(Prims.right(Prims.char(","))(variableParse)))((tup) => [tup[0]].concat(tup[1]));
let fooParser = Prims.seq(Prims.right(Prims.ws())(Prims.str("foo")))(Prims.between(Prims.char("("))(Prims.char(")"))(multiVariableparser))((tup) => new Foo_1.Foo(tup[1]));
let multiNumberParser = Prims.seq(numberParser)(Prims.many(Prims.right(Prims.char(","))(numberParser)))((tup) => [tup[0]].concat(tup[1]));
let listParser = Prims.appfun(Prims.between(Prims.char('('))(Prims.char(')'))(multiNumberParser))((tup) => new ListNode_1.ListNode(tup));
let betweenParser = Prims.between(Prims.char("("))(Prims.char(")"))(numberParser);
let rightParser = Prims.right(Prims.char("("))(numberParser);
let leftParser = Prims.left(numberParser)(Prims.char(")"));
let multiParser = Prims.choices(fooParser, listParser, assignParser, minusParser, plusParser, betweenParser);
// function parse(program : string): Option<Expression> {
//     let o = multiParser(new CharStream(program));
//     switch (o.tag) {
//         case 'success':
//             return Some(o.result);
//         case 'failure':
//             return None;
//     }
// }
const readLine = require("readline");
const r1 = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});
function grammar() {
    return Prims.right(multiParser)(Prims.eof());
}
r1.question("Type in your code to parse: ", (answer) => {
    // console.log(parse(answer).get());
    console.time("start");
    let outcome = grammar()(new CharStream(answer));
    console.timeEnd("start");
    //console.log("assignParser");
    //Prims.LCSParse(listParser, 0, new CharStream(answer));
    // console.log("betweenParser");
    // Prims.LCSParse(betweenParser, 0, new CharStream("(2222222 "));
    //console.log(outcome);
    if (outcome instanceof Prims.Failure) {
        console.log(outcome.error.toString());
        console.log(new Translator_1.Translator(outcome.error).toString());
    }
    //let outcome = Prims.strSat(["hello","hi"])(new CharStream("hiytutuy"));
    // let outcome3 = Prims.strSat(["hello","hi"])(new CharStream("ddddhellu"));
    // let outcome = grammar()(new CharStream(answer));
    // console.log(outcome);
    // if (outcome instanceof Prims.Failure) {
    //      console.log((new Translator(outcome.error)).toString());
    //     //console.log(outcome.error_pos);
    r1.close();
});
//# sourceMappingURL=parser.js.map