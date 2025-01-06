"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t)/* ------------------- Difference tool with it helpers ------------------ */

type UnnamedParams = boolean | any[];
interface DiffParams<T> {
  array1: T[];
  array2: T[];
  detailed?: boolean;
  uniques?: boolean;
}

class Difference<T> {
  result: any;
  // uniqueData: T[];
  // all: { diff1: T[]; diff2: T[] };

  constructor(...args: (DiffParams<T> | UnnamedParams)[]) {
    if (args.length == 1 && this.#isInstanceOfDiffParams(args[0])) {
      let { array1, array2, detailed, uniques } = args[0] as DiffParams<T>;
      this.result = this.#perform(array1, array2, detailed, uniques);
    } else {
      let [array1, array2, detailed, uniques] = args as any[];
      this.result = this.#perform(array1, array2, detailed, uniques);
    }
  }

  #isInstanceOfDiffParams<T>(obj: any) {
    let instance: DiffParams<T> = {
      array1: [],
      array2: [],
      detailed: false,
      uniques: true,
    };
    let boolMap = Object.keys(obj).map((x) => x in instance);
    return boolMap.every(Boolean);
  }

  #perform(
    array1: T[],
    array2: T[],
    detailed: boolean = false,
    uniques: boolean = false
  ) {
    let diff1 = array1.filter((x) => !array2.includes(x));
    let diff2 = array2.filter((x) => !array1.includes(x));
    if (uniques) {
      return detailed
        ? {
            diff1: uniquify(diff1),
            diff2: uniquify(diff2),
          }
        : uniquify([...diff1, ...diff2]);
    } else {
      return detailed
        ? {
            diff1,
            diff2,
          }
        : [...diff1, ...diff2];
    }
  }
}
// let x1 = list(range(4));
// let x2 = [4, 4, 4, 2, 5];
// console.log(new Difference({ array1: x1, array2: x2, uniques: true, detailed:false }));
/* ----------------------------------- end ---------------------------------- */
 op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.sel = exports.iter = exports.listic = exports.uniquify = exports.findPandQ = exports.int = exports.loop = exports.print = exports.recense = exports.list = exports.ival = exports.range = void 0;
var list = Array.from;
exports.list = list;
var print = console.log;
exports.print = print;
function range(begin, end, step) {
    var i;
    var _a;
    if (begin === void 0) { begin = 0; }
    if (end === void 0) { end = null; }
    if (step === void 0) { step = 1; }
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!end) {
                    _a = [begin, 0], end = _a[0], begin = _a[1];
                }
                i = begin;
                _b.label = 1;
            case 1:
                if (!(step < 0 ? i > end : i < end)) return [3 /*break*/, 4];
                return [4 /*yield*/, i];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                i += step;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
exports.range = range;
function ival(iterable) {
    var index, _i, iterable_1, value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                index = 0;
                _i = 0, iterable_1 = iterable;
                _a.label = 1;
            case 1:
                if (!(_i < iterable_1.length)) return [3 /*break*/, 4];
                value = iterable_1[_i];
                return [4 /*yield*/, [index, value]];
            case 2:
                _a.sent();
                index++;
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
exports.ival = ival;
function recense(iterable) {
    var tempoList = [];
    var finalList = [];
    var _loop_1 = function (a) {
        if (!tempoList.includes(a)) {
            tempoList.push(a);
            finalList.push([a, 1]);
        }
        else {
            finalList.map(function (x) {
                if (x[0] == a) {
                    var y = Number(x[1]);
                    x[1] = y++;
                }
            });
        }
    };
    for (var _i = 0, iterable_2 = iterable; _i < iterable_2.length; _i++) {
        var a = iterable_2[_i];
        _loop_1(a);
    }
    tempoList = [];
    return finalList;
}
exports.recense = recense;
function loop(iterable) {
    var index, array, last_index;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                index = 0;
                array = list(iterable);
                last_index = array.length - 1;
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 3];
                if (index == last_index) {
                    index = 0;
                }
                return [4 /*yield*/, array[index]];
            case 2:
                _a.sent();
                index++;
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}
exports.loop = loop;
function int(a) {
    return parseInt("" + a);
}
exports.int = int;
function findPandQ(x) {
    var results = new Array();
    for (var _i = 0, _a = range(x, 1, -1); _i < _a.length; _i++) {
        var q = _a[_i];
        var p = int(x / q);
        if (x == p * q)
            results.push([p, q]);
    }
    var halflen = int(results.length / 2) + 1;
    return results.slice(0, halflen);
    // return results;
}
exports.findPandQ = findPandQ;
function uniquify(items) {
    var uniques = [];
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var i = items_1[_i];
        if (!uniques.includes(i)) {
            uniques.push(i);
        }
    }
    return uniques;
}
exports.uniquify = uniquify;
function trim(param) {
    if (param.slice(0, 1) == " ")
        param = param.slice(1);
    if (param.slice(-1) == " ")
        param = param.slice(0, -1);
    return param;
}
function listic(params) {
    var _a = params.split("for"), beFor = _a[0], aFor = _a[1];
    var _b = aFor.split("if"), _ = _b[0], atIf = _b[1];
    var _c = aFor.split("if"), aFor2 = _c[0], __ = _c[1];
    var dataList = [];
    params.split("").forEach(function (x) {
        aFor2 = trim(aFor2);
    });
    if (aFor2.slice(0, 1) == "(")
        aFor2 = aFor2.slice(1, -1);
    var block = atIf
        ? "if(" + atIf + ") dataList.push(" + beFor + ");    \n  "
        : "dataList.push(" + beFor + ")";
    var script = "\n  for(" + aFor2 + "){\n    " + block + "\n  }\n  ";
    // print({ beFor, aFor, aFor2, atIf, script });
    eval(script);
    return dataList;
}
exports.listic = listic;
// const y = listic(`j for j of range(0,50, 3)`);
// const objs = [
// { a: 2, b: 4 },
// { a: 3, c: 5 },
// { a: 4, d: 6 },
// ];
// const x = listic(`o for let o of  objs if o['a']%2==0`);
// print(x);
function iter(iterable) {
    var _i, iterable_3, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _i = 0, iterable_3 = iterable;
                _a.label = 1;
            case 1:
                if (!(_i < iterable_3.length)) return [3 /*break*/, 4];
                i = iterable_3[_i];
                return [4 /*yield*/, i];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
exports.iter = iter;
function sel(array, index) {
    if (index === void 0) { index = 0; }
    // let array2 = typeof array == "string" ? array.split("") : list(array);
    index = int(index);
    if (index >= 0)
        return array[index];
    else
        return array[array.length + index];
}
exports.sel = sel;
var Difference = /** @class */ (function () {
    // uniqueData: T[];
    // all: { diff1: T[]; diff2: T[] };
    function Difference() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length == 1 && this..call(this, args[0])) {
            var _a = args[0], array1 = _a.array1, array2 = _a.array2, detailed = _a.detailed, uniques = _a.uniques;
            this.result = this..call(this, array1, array2, detailed, uniques);
        }
        else {
            var _b = args, array1 = _b[0], array2 = _b[1], detailed = _b[2], uniques = _b[3];
            this.result = this..call(this, array1, array2, detailed, uniques);
        }
    }
    Difference.prototype. = function (obj) {
        var instance = {
            array1: [],
            array2: [],
            detailed: false,
            uniques: true
        };
        var boolMap = Object.keys(obj).map(function (x) { return x in instance; });
        return boolMap.every(Boolean);
    };
    Difference.prototype. = function (array1, array2, detailed, uniques) {
        if (detailed === void 0) { detailed = false; }
        if (uniques === void 0) { uniques = false; }
        var diff1 = array1.filter(function (x) { return !array2.includes(x); });
        var diff2 = array2.filter(function (x) { return !array1.includes(x); });
        if (uniques) {
            return detailed
                ? {
                    diff1: uniquify(diff1),
                    diff2: uniquify(diff2)
                }
                : uniquify(__spreadArrays(diff1, diff2));
        }
        else {
            return detailed
                ? {
                    diff1: diff1,
                    diff2: diff2
                }
                : __spreadArrays(diff1, diff2);
        }
    };
    return Difference;
}());
// print(findPandQ(233))
