"use strict";
exports.__esModule = true;
var consts_1 = require("./consts");
var INVERTED_MAP = new Map();
for (var _i = 0, NUM_MAP_1 = consts_1["default"]; _i < NUM_MAP_1.length; _i++) {
    var data = NUM_MAP_1[_i];
    INVERTED_MAP.set(data[1], data[0]);
}
function from_base(number_, base) {
    if (base === void 0) { base = 2; }
    var result = 0;
    var number_list = number_
        .split("")
        .map(function (x) { return x.toUpperCase(); })
        .reverse();
    for (var i = 0; i < number_list.length; i++) {
        var v = number_list[i];
        var char = INVERTED_MAP.get(v);
        //@ts-ignore
        result += char * Math.pow(base, i);
    }
    return result;
}
var x = ["a", "b", "c", "d", "e", "f",];
for (var i in x) {
    console.log(i);
}
