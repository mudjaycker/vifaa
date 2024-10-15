import { range, list, print, uniquify } from "./collections";

function randint(from_: number = 0, to: number = 0): number {
  if (to == 0) {
    [from_, to] = [to, from_];
  }
  let multiple = to > 10 ? to : 10;
  let rand = Math.round(Math.random() * multiple);
  let result = rand % (to + 1);
  let array = list(range(from_, to + 1));

  if (result < from_) {
    for (let i of range(to + 1)) {
      result += i;
      if (result > from_) {
        if (result > to) {
          let tempo = i % (array.length - 1);
          result = array[tempo];
        }
        break;
      }
    }
  }
  return result;
}

function randint2(from_: number = 0, to: number = 0) {
  if (to == 0) {
    [from_, to] = [to, from_];
  }
  let array = list(range(from_, to + 1));
  let rand = Math.round(Math.random() * 100);
  let index = rand % array.length;
  return array[index];
}

function choice(iterable: Iterable<any>) {
  let array = list(iterable);
  let last_index = array.length - 1;
  let randIndex = randint2(last_index);
  return array[randIndex];
}

function randrange(
  from_: number = 0,
  to: number | null = null,
  step: number = 1
): number {
  let range_result = range(from_, to, step);
  return choice(range_result);
}

// let x: number[] = [];

// for (let i of range(100)) {
// x.push(randint2(0, 100));
// }
// let y = uniquify(x);
// print(x.length - y.length);
// print(x.length, y.length);
