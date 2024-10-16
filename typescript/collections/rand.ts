import { range, list } from "./collections";

function randint(from_: number = 0, to: number = 0) {
  if (to == 0) {
    [from_, to] = [to, from_];
  }
  let ecart = to - from_;
  let multiple = to > 100 ? to : 100;
  let rand = Math.round(Math.random() * multiple);
  let modulo = rand % ecart;
  return from_ + modulo;
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

export { randint, choice, randrange };
