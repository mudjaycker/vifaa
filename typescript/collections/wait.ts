function sleep(seconds: number) {
  seconds *= 1000;
  let now = () => new Date().getTime();
  let duration = seconds + now();

  while (now() < duration) {}
}
