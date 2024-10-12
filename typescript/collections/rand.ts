import { range, list, print } from "./collections";

function randint(from_: number = 0, to: number = 0) {
  if (to == 0) {
    [from_, to] = [to, from_];
  }
  let multiple = to > 10 ? to : 10;
  let rand = Math.ceil(Math.random() * multiple);
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

function listRand(iterable: Iterable<any> | ArrayLike<any>) {
  let array = list(iterable);
  let last_index = array.length - 1;
  let randIndex = randint(last_index);
  return array[randIndex];
}