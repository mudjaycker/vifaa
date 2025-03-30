class IterableToCheck<T> {
    iterable: string | T[];

    constructor(iterable: string | T[]) {
        this.iterable = iterable;
    }

    isEmpty() {
        return this.iterable.length == 0 || this.hasOnly(" ");
    }
    hasOnly(value: T | string) {
        let array = Object.values(this.iterable);
        const result = array.filter((x) => x != value);
        return !result.length;
    }

    hasRepeated(value: T | string) {
        let array = Object.values(this.iterable);
        let count = 0;

        if (array.includes(value)) {
            for (let i of array) {
                if (i == value) {
                    count++;
                }
            }
        }
        return { result: count > 1, count };
    }
}

const check = <T>(iterable: T[] | string) => new IterableToCheck(iterable); // shortcut do that we don't need to instance each time

export default check;
export { IterableToCheck };
