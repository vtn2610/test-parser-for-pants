import { Primitives, CharUtil } from 'pants';
import { AssignOp } from "./AssignOp";
import { Expression } from "./Expression";
import { NumberNode } from "./NumberNode";
import { VariableNode } from "./VariableNode";
import { PlusOp } from "./PlusOp";
import { MinusOp } from "./MinusOp";
import { ListNode } from "./ListNode";
import { Foo } from "./Foo";
import Prims = Primitives;
import CharStream = CharUtil.CharStream;
import { Option, Some, None, tuple } from 'space-lift';
import { Translator } from "../pants/lib/Errors/Translator";

let keyWordParser : Prims.IParser<CharStream> =
    Prims.seq<CharStream, CharStream, CharStream>(
        Prims.right<CharStream, CharStream>(Prims.ws())(Prims.str("var"))
    )(
        Prims.ws1()
    )( (tup : [CharStream, CharStream]) => CharStream.concat([tup[0], tup[1]])
    )

let variableParse : Prims.IParser<VariableNode> =
    Prims.right<CharStream, VariableNode>(
        keyWordParser
    )(
        Prims.appfun<CharStream[],VariableNode>(
            Prims.many1(Prims.letter())
        )(
            (ltr : CharStream[]) => new VariableNode(ltr.join(""))
        )
    )

let numberParser : Prims.IParser<NumberNode> = 
    Prims.appfun<CharStream[], NumberNode>(
        Prims.between<CharStream, CharStream, CharStream[]>(
            Prims.ws()
        )(
            Prims.ws()
        )(
            Prims.many1(Prims.digit())
        )
    )(
        (digitarray : CharStream[]) => new NumberNode(parseFloat(digitarray.join("")))
    )

let assignParser : Prims.IParser<AssignOp> = 
    Prims.seq<VariableNode, NumberNode, AssignOp>(
        Prims.left<VariableNode, CharStream>(
            variableParse
        )(
            Prims.right<CharStream, CharStream>(
                Prims.ws()
            )(
                Prims.char('=')
            )
        )
    )(
        Prims.right<CharStream, NumberNode>(
            Prims.ws()
        )(
            numberParser
        )
    )(
        (tup : [VariableNode, NumberNode]) => new AssignOp(tup[0], tup[1])
    )

let multiVariableparser : Prims.IParser<VariableNode[]> =
    Prims.seq<VariableNode, VariableNode[], VariableNode[]>(
        variableParse
    )(
        Prims.many(Prims.right<CharStream, VariableNode>(Prims.char(","))(variableParse))
    )(
        (tup : [VariableNode, VariableNode[]]) => [tup[0]].concat(tup[1])
    )

let fooParser : Prims.IParser<Foo> =
    Prims.debug(
    Prims.seq<CharStream, VariableNode[], Foo>(
        Prims.right<CharStream, CharStream>(Prims.ws())(Prims.str("foo"))
    )(
        Prims.between<CharStream, CharStream, VariableNode[]>(
            Prims.char("(")
        )(
            Prims.char(")")
        )(
            multiVariableparser
        )
    )(
        (tup : [CharStream, VariableNode[]]) => new Foo(tup[1])
))("fooParser");

// let multiNumberParser : Prims.IParser<NumberNode[]> =
//     Prims.seq<NumberNode, NumberNode[], NumberNode[]>(
//         numberParser
//     )(
//         Prims.many(Prims.right<CharStream, NumberNode>(Prims.char(","))(numberParser))
//     )(
//         (tup : [NumberNode, NumberNode[]]) => [tup[0]].concat(tup[1])
//     )

let listParser : Prims.IParser<ListNode> =
    Prims.seq<CharStream, NumberNode[], ListNode>(
        Prims.right<CharStream, CharStream>(Prims.ws())(Prims.char("["))
    )(
        Prims.many(Prims.right<CharStream, NumberNode>(Prims.char(","))(numberParser))
    )(
        (tup : [CharStream, NumberNode[]]) => new ListNode(tup[1])
    )

let plusParser : Prims.IParser<PlusOp> = 
    Prims.seq<NumberNode, NumberNode, PlusOp>(
        numberParser
    )(
        Prims.right<CharStream, NumberNode>(Prims.char("+"))(numberParser)
    )(
        (tup : [NumberNode, NumberNode]) => new PlusOp(tup[0], tup[1])
    )

let minusParser : Prims.IParser<MinusOp> = 
    Prims.seq<NumberNode, NumberNode, MinusOp>(
        numberParser
    )(
        Prims.right<CharStream, NumberNode>(Prims.char("-"))(numberParser)
    )(
        (tup : [NumberNode, NumberNode]) => new MinusOp(tup[0], tup[1])
    )

let betweenParser : Prims.IParser<NumberNode> = 
    Prims.between<CharStream, CharStream, NumberNode>(
        Prims.char("(")
    )(
        Prims.char(")")
    )(
        numberParser
    )

let rightParser : Prims.IParser<NumberNode> = 
    Prims.right<CharStream, NumberNode>(
        Prims.char("(")
    )(  
        numberParser
    )

let leftParser : Prims.IParser<NumberNode> = 
    Prims.left<NumberNode, CharStream>(
        numberParser
    )(  
        Prims.char(")")
    )

let multiParser : Prims.IParser<Expression> =
    Prims.choices<Expression>(fooParser, listParser, assignParser, plusParser, minusParser, betweenParser)

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
    input : process.stdin,
    output : process.stdout
})

// function grammar() {
//     return Prims.right(fooParser)(Prims.eof());
// }

r1.question("Type in your code to parse: ", (answer : string) => {

    // console.log(parse(answer).get());
    let outcome = multiParser(new CharStream(answer));

    if (outcome instanceof Prims.Failure) {
         console.log(outcome.error.toString());
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
