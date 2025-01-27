class IterableToCheck<T> {
  iterable: T | Iterable<T>;

  constructor(iterable: T | Iterable<T>) {
    this.iterable = iterable;
  }

  isNotEmpty(): boolean {
    if (typeof this.iterable === "object")
      return Object.keys(this.iterable as Iterable<T>).length > 0;

    return !!this.iterable;
  }

  isEmpty() {
    if (typeof this.iterable === "object")
      return !Object.keys(this.iterable as Iterable<T>).length;
    else if (typeof this.iterable === "string")
      //@ts-ignore
      return this.hasOnly("") || this.hasOnly(" ");
    else {
      return !this.iterable;
    }
  }
  hasOnly(value: T): boolean {
    let array = Object.values(this.iterable as Iterable<T>) as T[];
    const result = array.filter((x) => x != value);
    return !result.length;
  }

  hasRepeated(value: T): { result: boolean; count: number } {
    if (
      !(typeof this.iterable == "string" || typeof this.iterable == "object")
    ) {
      throw new Error(
        `Expected an Iterable instance but got "${typeof this.iterable}"`
      );
    }
    let array = Object.values(this.iterable as Iterable<T>) as T[];
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

const check = <T>(iterable: Iterable<T> | T) => new IterableToCheck(iterable); // shortcut do that we don't need to instance each time

export default check;
export { IterableToCheck };
