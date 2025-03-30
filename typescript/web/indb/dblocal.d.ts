interface Column {
    name: string;
    options?: IDBIndexParameters;
}
declare function sleep(milliseconds: number): Promise<unknown>;
declare class InDB {
    #private;
    dbname: string;
    version: number;
    constructor(dbname: string, version: number);
    openDB(): IDBOpenDBRequest;
    table(tablename: string, columns: Column[]): void;
    all(tablename: string): Promise<object>;
    get(tablename: string, id: number): Promise<IDBRequest<any>>;
    getWhere(tablename: string, where: object): Promise<object[]>;
    delete(tablename: string, id: number): Promise<any>;
    add(tablename: string, data: object): Promise<DOMException>;
    update(tablename: string, data: object): Promise<DOMException>;
}
interface T_InQ {
    tablename: string;
    columns: Column[];
}
interface T_TableSchema {
    tablename: string;
    columns: string[];
}
declare class InQ {
    tabSchemas: T_InQ[];
    constructor(args: T_InQ[]);
    all(tablename: string): Promise<object>;
    get(tablename: string, id: number): Promise<IDBRequest<any>>;
    getWhere(tablename: string, condition: object): Promise<object[]>;
    add(tablename: string, data: object): Promise<DOMException>;
    update(tablename: string, data: object): Promise<DOMException>;
    delete(tablename: string, id: number): Promise<any>;
}
declare let myDB: InQ;
