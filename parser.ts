import {AssignOp} from "./AssignOp";
import { NumberNode } from "./NumberNode";
import { VariableNode } from "./VariableNode";
import { Primitives, CharUtil } from 'pants';
import Prims = Primitives;
import CharStream = CharUtil.CharStream;
import { Option, Some, None, tuple} from 'space-lift';
import { Translator } from "./pants/lib/Errors/Translator";


let keyWordParser : Prims.IParser<CharStream> = i => {
    return Prims.seq<CharStream, CharStream, CharStream>(
        Prims.str("var")
    )(
        Prims.ws1()
    )( (tup : [CharStream, CharStream]) => CharStream.concat([tup[0], tup[1]])
    )(i) 
}

let variableParse : Prims.IParser<VariableNode> =
    Prims.right<CharStream, VariableNode>(
        keyWordParser
    )(
        Prims.appfun<CharStream,VariableNode>(
            Prims.letter()
        )(
            (ltr) => new VariableNode(ltr.toString())
        )
    )

let numberParser : Prims.IParser<NumberNode> = 
    Prims.appfun<CharStream[], NumberNode>(
        Prims.many1(Prims.digit())
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
        (tup) => new AssignOp(tup[0], tup[1])
    )

// let assignParse : Prims.IParser<AssignOp> = i => {
//     return Prims.seq<CharStream, NumberNode, AssignOp>(
//         equalParse
//     )(
//         numberParser
//     )(
//         (tup) => new AssignOp()
//     )
// }

function parse(program : string): Option<AssignOp> {
    let o = assignParser(new CharStream(program));
    switch (o.tag) {
        case 'success':
            return Some(o.result);
        case 'failure':
            return None;
    }
}

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

const readLine = require("readline");

const r1 = readLine.createInterface({
    input : process.stdin,
    output : process.stdout
})

r1.question("Type in your code to parse: ", (answer : string) => {

    // console.log(parse(answer).get());
    // let outcome = assignParser(new CharStream(answer));
    // if (outcome instanceof Prims.Failure) {
    //      console.log(outcome.error.toString());
    // }
    
    // let outcome2 = Prims.strSat(["hello","hi"])(new CharStream("hiytutuy"));
    // let outcome3 = Prims.strSat(["hello","hi"])(new CharStream("ddddhellu"));

    let outcome = betweenParser(new CharStream(answer));
    console.log(outcome);
    if (outcome instanceof Prims.Failure) {
        console.log((new Translator(outcome.error)).toString());
        //console.log(outcome.error_pos);
    }

    r1.close();
});