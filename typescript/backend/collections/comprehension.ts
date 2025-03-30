import { int, list, range } from "./collections";

function comprehension(params: string) {
  let range_condition: number[];
  let [operation, loopCondition] = params.split("for");

  if (loopCondition.includes("range")) {
    let [lc, rg] = loopCondition.split("of");

    rg = rg.replace(")", "");
    let [_, rg_num] = rg.split("(");
    range_condition = list(range(int(rg_num)));

    let code = `
      let list = [];
    (() => {
            for ${lc} of [${range_condition}]) {
                list.push(${operation})
            }
            return list
        }
    )()            
    `;

    return eval(code);
  } else {
    let code = `
    let list = [];
  (() => {
      for ${loopCondition} {
              list.push(${operation})
          }
          return list
      }
  )()
      
  `;
    return eval(code);
  }
}
let suite = list(range(11));
let cph = comprehension(`i+1 for( i of  [${suite.filter((x) => x % 2 == 0)}])`);
// let cph2 = comprehension(`i for( i of  range(106)`);
console.log(cph);
