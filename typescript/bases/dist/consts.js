"use strict";
exports.__esModule = true;
var collections_1 = require("../collections/collections");
var letters = [
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
var NUM_MAP = new Map();
for (var _i = 0, _a = collections_1.range(10); _i < _a.length; _i++) {
    var i = _a[_i];
    NUM_MAP.set(i, JSON.stringify(i));
}
for (var _b = 0, _c = collections_1.ival(letters); _b < _c.length; _b++) {
    var _d = _c[_b], index = _d[0], value = _d[1];
    value = String(value);
    console.log([index, value]);
    NUM_MAP.set(Number(index) + 10, value);
}
exports["default"] = NUM_MAP;
