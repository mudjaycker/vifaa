const list = Array.from;
const display = console.log;
const int = (a: number | string) => parseInt(`${a}`);

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

function recense<T>(iterable: Iterable<T>) {
    let datas = list(iterable);
    let uniques = uniquify(datas);
    return uniques.map((x) => {
        let tempo = datas.filter((y) => x == y);
        return [x, tempo.length];
    });
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

function sel<T>(array: T[] | string, index: number = 0) {
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

/* ------------------- Differents tool ------------------ */

type DiffParams<T> = {
    array1: T[];
    array2: T[];
    detailed?: boolean;
    uniques?: boolean;
};

type ResType<T> = {
    left: T[];
    right: T[];
    repeated: T[];
};
class Differents<T> {
    result: ResType<T> | T[];

    constructor(args: DiffParams<T>) {
        let { array1, array2, detailed, uniques } = args;
        this.result = this.#perform(array1, array2, detailed, uniques) as
            | T[]
            | ResType<T>;
    }

    #perform<T>(
        array1: T[],
        array2: T[],
        detailed: boolean = false,
        uniques: boolean = false
    ) {
        let left = array1.filter((x) => !array2.includes(x));
        let right = array2.filter((x) => !array1.includes(x));
        let repeated = [
            ...array1.filter((x) => array2.includes(x)),
            ...array2.filter((x) => array1.includes(x)),
        ];
        if (uniques) {
            return detailed
                ? {
                      left: uniquify(left),
                      right: uniquify(right),
                      repeated: uniquify(repeated),
                  }
                : uniquify([...left, ...right]);
        } else {
            return detailed
                ? {
                      left,
                      right,
                      repeated: uniquify(repeated),
                  }
                : [...left, ...right];
        }
    }
}
const differents = <T>(args: DiffParams<T>) => new Differents(args);
// let d = differents({ array1: [1, 2, 6, 7], array2: [2, 3, 7], detailed: true });
// display(d);

/* ----------------------------------- sameItems ---------------------------------- */
function sameItems<T>(array1: T[], array2: T[], uniques = true) {
    const res = differents({
        array1,
        array2,
        uniques,
        detailed: true,
    }).result as ResType<T>;
    return res.repeated;
}
// display(sameItems([1, 5, 7, 9], [8, 9, 15, 1, 7])); //=> [ 1, 7, 9 ]
/* ----------------------------------- end ---------------------------------- */

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
    sameItems,
};
