import { range, list, print, loop } from "./collections";
import cpuValues from "./test";

function randint(from_: number = 0, to: number = 0): number {
  if (to == 0) {
    [from_, to] = [to, from_];
  }
  let multiple = to > 10 ? to : 10;
  let rand = Math.round(Math.random() * multiple);
  let result = rand % (to + 1);

  if (result < from_) {
    for (let i of range(to + 1)) {
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

function choice(iterable: Iterable<any> | ArrayLike<any>) {
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

function randint2(from_: number = 0, to: number = 0) {
  for (let i of loop(range(from_, to + 1))) {
    let [idle, sysValue] = cpuValues();
    let randCpu = idle % sysValue;
    let rand = randCpu % 2 != 0 ? sysValue : idle;
    let result = rand % (to + 1);

    if (result < from_) {
      for (let i of range(to + 1)) {
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
}
/* for (let i of range(100)) {
  print(randint(12, 100));
} */
/* print(randint2(1998, 2060));
print(`\033[94m=>\033[0m`, randint(1998, 2060)); */
