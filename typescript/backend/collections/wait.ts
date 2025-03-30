function sleep(milliseconds: number) {
    let now = () => new Date().getTime();
    let duration = milliseconds + now();

    while (now() < duration) {}
}

function asleep(milliseconds: number) {
    return new Promise((res) => {
        const i = setTimeout((x) => {
            res(x);
            clearTimeout(i)
        }, milliseconds);
    });
}
