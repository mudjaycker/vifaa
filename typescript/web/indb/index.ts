const req = indexedDB.open("myDb", 1);

req.onupgradeneeded = (event: IDBVersionChangeEvent) => {
    const target = event.target as IDBOpenDBRequest;
    const db = target.result;
    const objStore = db.createObjectStore("users", { keyPath: "id" });
    objStore.createIndex("name", "name", { unique: false });
};
req.onsuccess = (ev) => {
    //@ts-ignore
    const db = ev.target.result;

    //Create
    function addUser(user) {
        const transaction = db.transaction(["users"], "readwrite");
        const objStore = transaction.objectStore("users");
        objStore.add(user);
    }

    //Read
    function getAllUser() {
        const transaction = db.transaction(["users"], "readonly");
        const objStore = transaction.objectStore("users");
        const req = objStore.getAll();
        req.onsuccess = (ev) => {
            console.log(ev.target.result);
        };
    }

    //Update
    function updateUser(user) {
        const transaction = db.transaction(["users"], "readwrite");
        const objStore = transaction.objectStore("users");
        objStore.put(user);
    }

    //Delete
    function deleteUser(userId) {
        const transaction = db.transaction(["users"], "readwrite");
        const objStore = transaction.objectStore("users");
        objStore.delete(userId);
    }

    //Utilization
    addUser({ id: 1, name: "Semahoro" });
    addUser({ id: 1, name: "h1" });
    getAllUser();

    // updateUser({ id: 1, name: "Semahoro Kama" });
    // getAllUser();

    // deleteUser(2);
    // getAllUser();
};

//Error
req.onerror = (event) => {
    console.log("Error -->", event);
};
