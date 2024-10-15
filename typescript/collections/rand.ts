import { range, list, print, uniquify } from "./collections";

function randint(from_: number = 0, to: number = 0) {
  if (to == 0) {
    [from_, to] = [to, from_];
  }
  let array = list(range(from_, to + 1));
  let multiple = to > 100 ? to : 100;
  let rand = Math.round(Math.random() * multiple);
  let index = rand % (array.length - 1);
  return array[index];
}

function choice(iterable: Iterable<any>) {
  let array = list(iterable);
  let last_index = array.length - 1;
  let randIndex = randint(last_index);
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

let x: number[] = [];

for (let i of range(1000)) {
  x.push(randint(0, 1000));
}
let y = uniquify(x);
print(x.length - y.length);
print(x.length, y.length);
