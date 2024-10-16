import { range, print } from "./collections";

function wait(seconds: number) {
  seconds *= 1000;
  let now = () => new Date().getTime();
  let duration = seconds + now();

  while (now() < duration) {}
}

for(let i of range(100)) {
    print(i);
    wait(1)
}
