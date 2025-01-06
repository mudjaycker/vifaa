const list = Array.from;
const print = console.log;

function* range(
  begin: number = 0,
  end: number | null = null,
  step: number = 1
) {
  if (end == null) {
    [end, begin] = [begin, 0];
  }

  for (let i = begin; step < 0 ? i > end : i < end; i += step) {
    yield i;
  }
}

function* ival(iterable: Iterable<any>) {
  let index = 0;
  for (let value of iterable) {
    yield [index, value];
    index++;
  }
}

function recense(iterable: Iterable<any>) {
  var tempoList: Array<any> = [];
  var finalList: Array<any> = [];

  for (let a of iterable) {
    if (!tempoList.includes(a)) {
      tempoList.push(a);
      finalList.push([a, 1]);
    } else {
      finalList.map((x) => {
        if (x[0] == a) {
          x[1]++;
        }
      });
    }
  }
  tempoList = [];
  return finalList;
}

function* loop(iterable: Iterable<any>) {
  let index = 0;
  let array = list(iterable);
  let last_index = array.length - 1;
  while (true) {
    if (index == last_index) {
      index = 0;
    }
    yield array[index];
    index++;
  }
}

function last(iterable: Iterable<any>) {
  let array = list(iterable);
  let last_index = array.length - 1;
  return array[last_index];
}

function int(a: number | string): number {
  return parseInt(`${a}`);
}

function* factorise(x: number) {
  let i = 0;
  let j = 0;
  for (let q of range(x, 1, -1)) {
    let p = int(x / q);
    if (x == p * q) {
      i++;
      j += 0.5;
      if (j == int(i / 2)) yield [p, q];
    }
  }
}

function uniquify(items: Iterable<any>) {
  let uniques: any[] = [];
  for (let i of items) {
    if (!uniques.includes(i)) {
      uniques.push(i);
    }
  }
  return uniques;
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
  // print({ beFor, aFor, aFor2, atIf, script });
  eval(script);
  return dataList;
}

function sel<T>(array: T[] | string, index: number = 0): T | string {
  // let array2 = typeof array == "string" ? array.split("") : list(array);
  index = int(index);

  if (index >= 0) return array[index];
  else return array[array.length + index];
}

export {
  range,
  ival,
  list,
  recense,
  print,
  loop,
  last,
  int,
  factorise,
  uniquify,
};

print(list(factorise(100)))