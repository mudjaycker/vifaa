const list = Array.from;
const display = console.log;

function* range(
  begin: number = 0,
  end: number | null = null,
  step: number = 1
) {
  if (!end) {
    [end, begin] = [begin, 0];
  }

  for (let i = begin; step < 0 ? i > end : i < end; i += step) {
    yield i;
  }
}

function* ival<T>(iterable: Iterable<T>) {
  let index = 0;

  for (let value of iterable) {
    yield [index, value];
    index++;
  }
}

function recense<T>(iterable: Iterable<T>): Array<number | T>[] {
  var tempoList: Array<T> = [];
  var finalList: Array<number | T>[] = [];

  for (let a of iterable) {
    if (!tempoList.includes(a)) {
      tempoList.push(a);
      finalList.push([a, 1]);
    } else {
      finalList.map((x) => {
        if (x[0] == a) {
          let y = Number(x[1]);
          x[1] = y++;
        }
      });
    }
  }
  tempoList = [];
  return finalList;
}

function* loop<T>(iterable: Iterable<T>) {
  let index = 0;
  let array = list(iterable);
  let last_index = array.length;
  while (true) {
    if (index == last_index) {
      index = 0;
    }
    yield array[index];
    index++;
  }
}

function int(a: number | string): number {
  return parseInt(`${a}`);
}

function findPandQ(x: number) {
  let results = new Array<number[]>();

  for (let q of range(x, 1, -1)) {
    let p = int(x / q);

    if (x == p * q) results.push([p, q]);
  }

  const halflen = int(results.length / 2) + 1;
  return results.slice(0, halflen);
  // return results;
}

type Iter<T> = Array<T> | Generator<T>;
function uniquify<T>(items: Iter<T>): T[] {
  let uniques: T[] = [];
  for (let i of items) {
    if (!uniques.includes(i)) {
      uniques.push(i);
    }
  }
  return uniques;
}

function trim(text: string) {
  if (text.slice(0, 1) == " ") text = text.slice(1);
  if (text.slice(-1) == " ") text = text.slice(0, -1);
  return text;
}

function listic(params: string): any[] {
  const [beFor, aFor] = params.split("for");
  const [_, atIf] = aFor.split("if");
  let [aFor2, __] = aFor.split("if");
  let dataList = [];

  params.split("").forEach((x) => {
    aFor2 = trim(aFor2);
  });

  if (aFor2.slice(0, 1) == "(") aFor2 = aFor2.slice(1, -1);

  const block = atIf
    ? `if(${atIf}) dataList.push(${beFor});    
  `
    : `dataList.push(${beFor})`;

  const script = `
  for(${aFor2}){
    ${block}
  }
  `;
  // display({ beFor, aFor, aFor2, atIf, script });
  eval(script);
  return dataList;
}

// const y = listic(`j for j of range(0,50, 3)`);
// const objs = [
// { a: 2, b: 4 },
// { a: 3, c: 5 },
// { a: 4, d: 6 },
// ];
// const x = listic(`o for let o of  objs if o['a']%2==0`);
// display(x);

function* iter<T>(iterable: Iter<T>) {
  for (let i of iterable) {
    yield i;
  }
}

function sel<T>(array: T[] | string, index: number = 0): T | string {
  // let array2 = typeof array == "string" ? array.split("") : list(array);
  index = int(index);

  if (index >= 0) return array[index];
  else return array[array.length + index];
}

/* ------------------- Difference tool with it helpers ------------------ */

type UnnamedParams = boolean | any[];
interface DiffParams<T> {
  array1: T[];
  array2: T[];
  detailed?: boolean;
  uniques?: boolean;
}

class Difference<T> {
  result:
    | T[]
    | {
        diff1: T[];
        diff2: T[];
      };
  // uniqueData: T[];
  // all: { diff1: T[]; diff2: T[] };

  constructor(...args: (DiffParams<T> | UnnamedParams)[]) {
    if (args.length == 1 && this.#isInstanceOfDiffParams(args[0])) {
      let { array1, array2, detailed, uniques } = args[0] as DiffParams<T>;
      this.result = this.#perform(array1, array2, detailed, uniques);
    } else {
      let [array1, array2, detailed, uniques] = args as any[];
      this.result = this.#perform(array1, array2, detailed, uniques);
    }
  }

  #isInstanceOfDiffParams<T>(obj: any) {
    let instance: DiffParams<T> = {
      array1: [],
      array2: [],
      detailed: false,
      uniques: true,
    };
    let boolMap = Object.keys(obj).map((x) => x in instance);
    return boolMap.every(Boolean);
  }

  #perform(
    array1: T[],
    array2: T[],
    detailed: boolean = false,
    uniques: boolean = false
  ) {
    let diff1 = array1.filter((x) => !array2.includes(x));
    let diff2 = array2.filter((x) => !array1.includes(x));
    if (uniques) {
      return detailed
        ? {
            diff1: uniquify(diff1),
            diff2: uniquify(diff2),
          }
        : uniquify([...diff1, ...diff2]);
    } else {
      return detailed
        ? {
            diff1,
            diff2,
          }
        : [...diff1, ...diff2];
    }
  }
}
// let x1 = list(range(4));
// let x2 = [4, 4, 4, 2, 5];
// console.log(new Difference({ array1: x1, array2: x2, uniques: true, detailed:false }));
/* ----------------------------------- end ---------------------------------- */

export {
  range,
  ival,
  list,
  recense,
  display,
  loop,
  int,
  findPandQ,
  uniquify,
  listic,
  iter,
  sel,
};

// display(findPandQ(233))
