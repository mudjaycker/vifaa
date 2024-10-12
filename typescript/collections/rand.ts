import { range, list } from "./collections";

function randint(from_: number = 0, to: number = 0) {
  if (to == 0) {
    [from_, to] = [to, from_];
  }
  let multiple = to > 100 ? to : 100;
  let rand = parseInt(`${Math.random() * multiple}`, 10);
  let mod = rand % (to + 1);
  let result = mod;
  if (result < from_) {
    for (let i of range(to)) {
      result += i;
      if (result > from_) {
        if (result >= to) {
          result = to;
        }
        break;
      }
    }
  }
  return result;
}

function listRand(iterable: Iterable<any> | Array<any>) {
  let array = list(iterable);
  let last_index = array.length - 1;
  let randIndex = randint(last_index);
  return array[randIndex];
}
