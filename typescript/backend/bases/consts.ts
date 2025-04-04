import { ival, range } from "../collections/collections";
const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "{",
    "}",
    "[",
    "]",
    "(",
    ")",
    ",",
    ".",
    ":",
    ";",
    "'",
    "!",
    "?",
    "-",
    "_",
    "+",
    '"',
    " ",
];

let NUM_MAP: Map<number, string> = new Map();

for (let i of range(10)) {
    NUM_MAP.set(i, JSON.stringify(i));
}

for (let [index, value] of ival(letters)) {
    value = String(value);
    console.log([index, value]);

    NUM_MAP.set(Number(index) + 10, value);
}

export default NUM_MAP;
