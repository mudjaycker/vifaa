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
];

let NUM_MAP = new Map();

for (let i = 0; i < 10; i++) {
  NUM_MAP.set(i, JSON.stringify(i));
}

for (let i in letters) {
  NUM_MAP.set(Number(i) + 10, letters[i]);
}

export default NUM_MAP;
