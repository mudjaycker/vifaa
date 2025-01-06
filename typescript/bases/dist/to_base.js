"use strict";
exports.__esModule = true;
var consts_1 = require("./consts");
var collections_1 = require("../collections/collections");
function to_base(_number, base) {
    if (base === void 0) { base = 2; }
    var temp = collections_1.int(_number);
    var result = "";
    if (_number == 0)
        return "0";
    while (temp > 0) {
        var mod = temp % base;
        temp = collections_1.int(temp / base);
        var mod2 = consts_1["default"].get(mod);
        result = mod2 + result;
    }
    return result;
}
// let num = 27;
// console.log(to_base(num, 16));
// console.log(to_base(num, 8));
