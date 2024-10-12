import NUM_MAP from "./consts";

function to_base(_number: number, base: number = 2) {
  let temp = parseInt(`${_number}`, 10);
  let result = "";

  if (_number == 0) return "0";

  while (temp > 0) {
    let mod = temp % base;
    temp = parseInt(`${temp / base}`, 10);
    let mod2 = NUM_MAP.get(mod);
    result = mod2 + result;
  }
  return result;
}

let num = 27;
console.log(to_base(num, 16));
console.log(to_base(num, 8));
