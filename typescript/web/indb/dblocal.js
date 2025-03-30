var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _InDB_instances, _InDB_request, _InDB_result, _InDB_doGet, _InDB_doAll, _InDB_waitData;
function sleep(milliseconds) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res) => {
            const i = setTimeout(() => {
                res(i);
                clearInterval(i);
            }, milliseconds);
        });
    });
}
class InDB {
    constructor(dbname, version) {
        _InDB_instances.add(this);
        _InDB_request.set(this, void 0);
        _InDB_result.set(this, void 0);
        this.dbname = dbname;
        this.version = version;
        __classPrivateFieldSet(this, _InDB_request, indexedDB.open(dbname, version), "f");
    }
    openDB() {
        return indexedDB.open(this.dbname, this.version);
    }
    //--------------------------------------
    //Public methods
    table(tablename, columns) {
        __classPrivateFieldGet(this, _InDB_request, "f").onupgradeneeded = (event) => {
            const target = event.target;
            const db = target.result;
            const objStore = db.createObjectStore(tablename, {
                keyPath: "id",
                autoIncrement: true,
            });
            columns.forEach((column) => {
                objStore.createIndex(column.name, column.name, column.options);
            });
        };
    }
    all(tablename) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = () => __classPrivateFieldGet(this, _InDB_instances, "m", _InDB_doAll).call(this, tablename);
            return yield __classPrivateFieldGet(this, _InDB_instances, "m", _InDB_waitData).call(this, res);
        });
    }
    get(tablename, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = () => __classPrivateFieldGet(this, _InDB_instances, "m", _InDB_doGet).call(this, tablename, id);
            return yield __classPrivateFieldGet(this, _InDB_instances, "m", _InDB_waitData).call(this, res);
        });
    }
    getWhere(tablename, where) {
        return __awaiter(this, void 0, void 0, function* () {
            let allData = (yield this.all(tablename));
            let data = [];
            allData.forEach((o) => {
                let bools = [];
                for (let wKey in where) {
                    if (Object.keys(o).includes(wKey)) {
                        bools.push(o[wKey] == where[wKey]);
                    }
                }
                if (bools.every(Boolean) && bools.length > 0) {
                    data.push(o);
                }
            });
            return data;
        });
    }
    delete(tablename, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = this.openDB();
            //@ts-ignore
            request.onsuccess = (ev) => {
                const target = ev.target;
                const db = target.result;
                const transaction = db.transaction([tablename], "readwrite");
                transaction.objectStore(tablename).delete(id);
            };
            return null;
        });
    }
    add(tablename, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = this.openDB();
            let result;
            //@ts-ignore
            request.onsuccess = (ev) => {
                const target = ev.target;
                const db = target.result;
                const transaction = db.transaction(tablename, "readwrite");
                const objStore = transaction.objectStore(tablename);
                const req = objStore.add(data);
                //@ts-ignore
                result = req.transaction;
            };
            let counter = 0;
            while (true) {
                if (result || counter >= 10) {
                    return result === null || result === void 0 ? void 0 : result.error;
                }
                yield sleep(100);
                counter++;
            }
        });
    }
    update(tablename, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = this.openDB();
            let result;
            //@ts-ignore
            request.onsuccess = (ev) => {
                const target = ev.target;
                const db = target.result;
                const transaction = db.transaction([tablename], "readwrite");
                const objStore = transaction.objectStore(tablename).put(data);
                //@ts-ignore
                result = objStore.transaction;
            };
            let counter = 0;
            while (true) {
                if (result || counter >= 10) {
                    return result === null || result === void 0 ? void 0 : result.error;
                }
                yield sleep(100);
                counter++;
            }
        });
    }
}
_InDB_request = new WeakMap(), _InDB_result = new WeakMap(), _InDB_instances = new WeakSet(), _InDB_doGet = function _InDB_doGet(tablename, id) {
    let request = this.openDB();
    request.onsuccess = (ev) => {
        const target = ev.target;
        const db = target.result;
        const transaction = db.transaction([tablename], "readonly");
        const objStore = transaction.objectStore(tablename);
        objStore.get(id).onsuccess = (ev) => {
            let res = ev.target;
            __classPrivateFieldSet(this, _InDB_result, res.result, "f");
        };
    };
    return __classPrivateFieldGet(this, _InDB_result, "f");
}, _InDB_doAll = function _InDB_doAll(tablename) {
    let request = this.openDB();
    //@ts-ignore
    request.onsuccess = (ev) => {
        const target = ev.target;
        const db = target.result;
        const transaction = db.transaction([tablename], "readonly");
        const objStore = transaction.objectStore(tablename);
        var result = objStore.getAll();
        result.onsuccess = (ev) => {
            //@ts-ignore
            let res = ev.target;
            __classPrivateFieldSet(this, _InDB_result, res.result, "f");
        };
    };
    return __classPrivateFieldGet(this, _InDB_result, "f");
}, _InDB_waitData = function _InDB_waitData(result) {
    return __awaiter(this, void 0, void 0, function* () {
        let counter = 0;
        let response = undefined;
        while (!response) {
            response = result();
            if (response != undefined || counter >= 100) {
                return response;
            }
            yield sleep(1);
            counter++;
        }
        return response;
    });
};
class InQ {
    constructor(args) {
        this.tabSchemas = args;
        args.forEach((arg) => {
            let db = new InDB(arg.tablename, 1);
            db.table(arg.tablename, arg.columns);
        });
    }
    all(tablename) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = new InDB(tablename, 1);
            return yield db.all(tablename);
        });
    }
    get(tablename, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = new InDB(tablename, 1);
            return yield db.get(tablename, id);
        });
    }
    getWhere(tablename, condition) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = new InDB(tablename, 1);
            return yield db.getWhere(tablename, condition);
        });
    }
    add(tablename, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = new InDB(tablename, 1);
            let tabSchema = this.tabSchemas.find((t) => t.tablename == tablename);
            let columnsName = tabSchema === null || tabSchema === void 0 ? void 0 : tabSchema.columns.map((c) => c.name);
            for (let dKey in data) {
                if (!(columnsName === null || columnsName === void 0 ? void 0 : columnsName.includes(dKey))) {
                    throw new Error(`Table ${tablename} 's schema has not column named  ${dKey}`);
                }
            }
            return yield db.add(tablename, data);
        });
    }
    update(tablename, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = new InDB(tablename, 1);
            return yield db.update(tablename, data);
        });
    }
    delete(tablename, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = new InDB(tablename, 1);
            return yield db.delete(tablename, id);
        });
    }
}
let myDB = new InQ([
    {
        tablename: "tab1",
        columns: [
            { name: "age", options: { unique: true } },
            { name: "name", options: { unique: false } },
        ],
    },
    {
        tablename: "tab2",
        columns: [
            { name: "address", options: { unique: true } },
            { name: "mail", options: { unique: false } },
        ],
    },
]);
// myDB.add("tab2", { address: "bonga 47", mail: "h@k" });
// myDB.add("tab2", { address: "itoumbi 70", mail: "t@n" });
(() => __awaiter(this, void 0, void 0, function* () {
    // let req1 = await myDB.add("tab1", { name: "moi", age: 22 });
    // let req2 = await myDB.add("tab1", { name: "elle", age: 39 });
    // let req1 = await myDB.delete("tab1", 2);
    // console.log({ req1, req2 });
    console.log("all1", yield myDB.all("tab1"));
    console.log("all2", yield myDB.get("tab1", 15));
}))();
