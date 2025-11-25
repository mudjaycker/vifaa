class LStore {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    private fromString(data: string | null) {
        return data ? JSON.parse(data) : null;
    }

    private toString(data: Object | null) {
        return JSON.stringify(data || []);
    }

    get() {
        return this.fromString(localStorage.getItem(this.name));
    }

    set(data: Object | null = null) {
        const stringData = this.toString(data);
        localStorage.setItem(this.name, stringData);
    }

    remove() {
        localStorage.removeItem(this.name);
    }
}

const lstore = (name: string) => new LStore(name);
export default lstore;
