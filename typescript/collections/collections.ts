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

function* ival(iterable: Array<any> | Generator<any>) {
  let index = 0;
  for (let value of iterable) {
    yield [index, value];
    index++;
  }
}

function recense(iterable: Iterable<any> | Array<any>) {
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

function* loop(iterable: Iterable<any> | ArrayLike<any>) {
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

function last(iterable: Iterable<any> | ArrayLike<any>) {
  let array = list(iterable);
  let last_index = array.length - 1;
  return array[last_index];
}

function divint(a: number, b: number): number {
  return parseInt(`${a / b}`);
}

export { range, ival, list, recense, print, loop, last, divint };