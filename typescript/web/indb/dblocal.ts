interface Column {
    name: string;
    // keyPath: string | Iterable<string>
    options?: IDBIndexParameters;
}

interface T_TableSchema {
    tablename: string;
    columns: Column[];
}

type T_DataOutput = { id: number } & Record<string, any>;
type T_DataInput = Record<string, any>;

function sleep(milliseconds: number) {
    return new Promise((res) => {
        const i = setTimeout(() => {
            res(i);
            clearInterval(i);
        }, milliseconds);
    });
}

class InDB {
    #request: IDBOpenDBRequest;
    #result: T_DataOutput[] = [];
    dbname: string;
    version: number;
    
    constructor(dbname: string, version: number) {
        this.dbname = dbname;
        this.version = version;
        this.#request = indexedDB.open(dbname, version);
    }

    openDB() {
        return indexedDB.open(this.dbname, this.version);
    }

    //Private methods
    #doGet(tablename: string, id: number) {
        let request = this.openDB();

        request.onsuccess = (ev) => {
            const target = ev.target as IDBOpenDBRequest;
            const db = target.result;
            const transaction = db.transaction([tablename], "readonly");
            const objStore = transaction.objectStore(tablename);

            objStore.get(id).onsuccess = (ev) => {
                let res = ev.target as IDBRequest;
                this.#result = res.result;
            };
        };
        return this.#result;
    }

    #doAll(tablename: string) {
        let request = this.openDB();

        request.onsuccess = (ev: Event) => {
            const target = ev.target as IDBOpenDBRequest;
            const db = target.result;
            const transaction = db.transaction([tablename], "readonly");
            const objStore = transaction.objectStore(tablename);
            var result = objStore.getAll();
            result.onsuccess = (ev: Event) => {
                let res = ev.target as IDBRequest;
                this.#result = res.result;
            };
        };
        return this.#result;
    }

    async #waitData<T>(result: () => T) {
        let counter = 0;
        let response: T | undefined = undefined;
        while (true) {
            response = result();
            if (response != undefined || counter >= 100) {
                return response;
            }
            await sleep(10);
            counter++;
        }
    }

    //--------------------------------------

    //Public methods
    table(tables: T_TableSchema[]) {
        this.#request.onupgradeneeded = (event: Event) => {
            const target = event.target as IDBOpenDBRequest;
            const db = target.result;
            for (let table of tables) {
                const objStore = db.createObjectStore(table.tablename, {
                    keyPath: "id",
                    autoIncrement: true,
                });

                table.columns.forEach((column) => {
                    objStore.createIndex(
                        column.name,
                        column.name,
                        column?.options
                    );
                });
            }
        };
    }

    async all(tablename: string) {
        let res = () => this.#doAll(tablename);
        return await this.#waitData(res);
    }

    async get(tablename: string, id: number) {
        let res = () => this.#doGet(tablename, id);
        return await this.#waitData(res);
    }

    async getWhere(tablename: string, pred: (x: any) => boolean) {
        let allData = await this.all(tablename);
        let data = allData.filter(pred);
        return data;
    }

    async delete(tablename: string, id: number) {
        let request = this.openDB();

        request.onsuccess = (ev: Event) => {
            const target = ev.target as IDBOpenDBRequest;
            const db = target.result;
            const transaction = db.transaction([tablename], "readwrite");
            transaction.objectStore(tablename).delete(id);
        };
    }

    async add(tablename: string, data: T_DataInput) {
        let request = this.openDB();
        let result: IDBTransaction | null;

        request.onsuccess = (ev: Event) => {
            const target = ev.target as IDBOpenDBRequest;
            const db = target.result;
            const transaction = db.transaction(tablename, "readwrite");
            const objStore = transaction.objectStore(tablename);
            const req = objStore.add(data);

            result = req.transaction;
        };
        return this.#waitData(() => result?.error);
    }

    async update(tablename: string, data: T_DataInput) {
        let request = this.openDB();
        let result: IDBTransaction | null;

        request.onsuccess = (ev: Event) => {
            const target = ev.target as IDBOpenDBRequest;
            const db = target.result;
            const transaction = db.transaction([tablename], "readwrite");
            const objStore = transaction.objectStore(tablename).put(data);

            result = objStore.transaction;
        };

        return this.#waitData(() => result?.error);
    }
}

class InQ {
    tabSchemas: T_TableSchema[];
    dbname: string;
    version: number;
    constructor(dbname: string, args: T_TableSchema[], version = 1) {
        this.dbname = dbname;
        this.tabSchemas = args;
        this.version = version;
        let db = new InDB(dbname, version);
        db.table(args);
    }

    #db() {
        return new InDB(this.dbname, this.version);
    }

    async fromAllTable() {
        let res = {} as Record<string, T_DataOutput[]>;
        this.tabSchemas.forEach(
            async (t) => (res[t.tablename] = await this.all(t.tablename))
        );

        return res;
    }

    async all(tablename: string) {
        return await this.#db().all(tablename);
    }

    async get(tablename: string, id: number) {
        return await this.#db().get(tablename, id);
    }

    async getWhere(tablename: string, condition: (x: T_DataInput) => boolean) {
        return await this.#db().getWhere(tablename, condition);
    }

    async add(tablename: string, data: T_DataInput) {
        let tabSchema = this.tabSchemas.find((t) => t.tablename == tablename);
        const columnNames = tabSchema?.columns.map((c) => c.name);
        for (let dKey in data) {
            if (!columnNames?.includes(dKey)) {
                throw new Error(
                    `Table ${tablename} 's schema has no column named  ${dKey}`
                );
            }
        }
        return await this.#db().add(tablename, data);
    }

    async update(tablename: string, data: T_DataInput) {
        return await this.#db().update(tablename, data);
    }

    async delete(tablename: string, id: number) {
        return await this.#db().delete(tablename, id);
    }

    async deleteWhere(tablename: string, pred: (x: T_DataInput) => boolean) {
        const founds = await this.getWhere(tablename, pred);
        const deleteds = await Promise.all(
            founds.map((x) => {
                this.delete(tablename, x.id);
                return x;
            })
        );
        return deleteds;
    }
}

//Exemple of usage
/* (async () => {
    let myDB = new InQ("mydb", [
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
        {
            tablename: "tab3",
            columns: [
                { name: "school", options: { unique: true } },
                { name: "username", options: { unique: false } },
            ],
        },
    ]);

    await myDB.add("tab1", { name: "moi", age: 22 });
    await myDB.add("tab1", { name: "elle", age: 39 });
    await myDB.add("tab2", { address: "bonga 47", mail: "h@k" });
    await myDB.add("tab2", { address: "bonga 48", mail: "jj@k" });
    await myDB.add("tab2", { address: "itoumbi 70", mail: "t@n" });
    await myDB.add("tab2", { address: "itoumbi 72", mail: "t@n" });

    (await myDB.all("tab2")).forEach((x) => {
        console.log(x);
        myDB.delete("tab2", x.id);
    });
})();
 */

