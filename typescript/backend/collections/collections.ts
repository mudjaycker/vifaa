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
  if (sel(text, 0) == " ") return trim(text.slice(1));
  if (sel(text, -1) == " ") return trim(text.slice(0, -1));
  return text;
}

// display(trim("          bonus     ").length);

function listic(params: string): any[] {
  const [beFor, atFor] = params.split("for");
  const [_, atIf] = atFor.split("if");
  let [atFor2, __] = atFor.split("if");
  let dataList = [];

  params.split("").forEach((x) => {
    atFor2 = trim(atFor2);
  });

  if (atFor2.slice(0, 1) == "(") atFor2 = atFor2.slice(1, -1);

  const block = atIf
    ? `if(${atIf}) dataList.push(${beFor});    
  `
    : `dataList.push(${beFor})`;

  const script = `
  for(${atFor2}){
    ${block}
  }
  `;
  eval(script);
  return dataList;
}

function* iter<T>(iterable: Iter<T>) {
  for (let i of iterable) {
    yield i;
  }
}

function sel<T>(array: T[] | string, index: number = 0): T | string {
  index = int(index); // let array2 = typeof array == "string" ? array.split("") : list(array);

  if (index >= 0) return array[index];
  else return array[array.length + index];
}

type ItemType<T> = (T | string)[] | string;
function sub<T>(items: ItemType<T>, { from_ = 0, to = 0 }) {
  from_ = !!from_ ? from_ : 0;
  to = !!to ? to : items.length;
  let new_items = list(items);
  let result = [] as (T | string)[];

  if (from_ < 0) {
    new_items.reverse();
    from_ = Math.abs(from_) - 1;
    // to = to > 0?  new_items.length-to: to
    to = to == items.length ? to : new_items.length - to;
  }
  if (to < 0) {
    throw EvalError(
      `The parameter "to" must be a positive integer but got ${to}`
    );
  }

  for (let i of range(from_, to)) {
    display(sel(new_items, i), i);
    result.push(sel(new_items, i));
  }

  return typeof items == "string" ? result.join("") : result;
}

/* ------------------- Differents tool with it helpers ------------------ */

type UnnamedParams = any | boolean[];
type DiffParams<T> = {
  array1: T[];
  array2: T[];
  detailed?: boolean;
  uniques?: boolean;
};

type DiffType<T> =
  | T[]
  | {
      diff1: T[];
      diff2: T[];
    };

class Differents<T> {
  result: DiffType<T>;

  constructor(...args: DiffParams<T>[]) {
    // if (args.length == 1 && this.#isInstanceOfDiffParams(args[0])) {
    let { array1, array2, detailed, uniques } = args[0] as DiffParams<T>;
    this.result = this.#perform(array1, array2, detailed, uniques);
    //}
    /* else {
      let [array1, array2, detailed, uniques] = args as UnnamedParams;
      this.result = this.#perform(array1, array2, detailed, uniques);
      array1;
    } */
  }

  #isInstanceOfDiffParams<T>(obj: T) {
    let instance: DiffParams<T> = {
      array1: [],
      array2: [],
      detailed: false,
      uniques: true,
    };
    //@ts-ignore
    let boolMap = Object.keys(obj).map((x) => x in instance);
    return boolMap.every(Boolean);
  }

  #perform<T>(
    array1: T[],
    array2: T[],
    detailed: boolean = false,
    uniques: boolean = false
  ) {
    let diff1 = array1.filter((x) => !array2.includes(x));
    let diff2 = array2.filter((x) => !array1.includes(x));
    let repeated = [
      ...array1.filter((x) => array2.includes(x)),
      ...array2.filter((x) => array1.includes(x)),
    ];
    if (uniques) {
      return detailed
        ? {
            diff1: uniquify(diff1),
            diff2: uniquify(diff2),
            repeated: uniquify(repeated),
          }
        : uniquify([...diff1, ...diff2]);
    } else {
      return detailed
        ? {
            diff1,
            diff2,
            repeated: uniquify(repeated),
          }
        : [...diff1, ...diff2];
    }
  }
}
const differents = <T>(...args: DiffParams<T>[]) => new Differents(...args);
// let d = differents({ array1: [1, 2, 6, 7], array2: [2, 3, 7], detailed: true });
// display(d);

function undifferents<T>(array1: T[], array2: T[], uniques = true): T[] {
  const items = [...array1, ...array2];
  const diffs = differents({ array1, array2 }).result as T[];
  const result = items.filter((item) => !diffs.includes(item));
  return uniques ? uniquify(result) : result;
}

const sameItems = undifferents;

// display(sameItems([1, 5, 7, 9], [8, 9, 15, 1, 7]));
/* ----------------------------------- end ---------------------------------- */

/* -------------------------------- deepFlat ------------------------------- */
interface objx<T> {
  [key: string]: T;
}

function deepFlat<T, U>(items: Iterable<T> | objx<U>) {
  var res: any[] = [];
  items = Object.values(items);

  for (let i of items) {
    if (typeof i == "object") {
      //@ts-ignore
      res = [...res, ...deepFlat(Object.values(i))];
    } else res.push(i);
  }
  return res;
}

const obj = [
  {
    a: {
      b: {
        c: 3,
      },
      b2: {
        c2: 8,
      },
    },
    f: {
      n: "nano",
    },
  },
  {
    x: {
      b: {
        c: 9,
      },
      z2: {
        c2: 83,
      },
    },
    f: {
      n: "oh",
    },
  },
];
display(deepFlat(obj));
let x = deepFlat({
  a: ["3"],
  f: {
    g: 7,
  },
});
display(x);
/* ----------------------------------- end ---------------------------------- */

/* ------------------------------- objWithout ------------------------------- */
function objWithout(obj: { [key: string]: any }, omittedKeys: string[]) {
  let newObj: { [key: string]: any } = {};
  for (let key in obj) {
    if (!omittedKeys.includes(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
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
  deepFlat,
  differents,
  sub,
  undifferents,
  sameItems,
};
