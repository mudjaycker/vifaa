// index.ts
class Shttp {
  constructor() {
  }
  get(url, header = {}) {
    const REQUEST = new XMLHttpRequest;
    console.log(url);
    REQUEST.open("GET", url);
    return new Promise((resolve, reject) => {
      REQUEST.onload = () => {
        if (REQUEST.status >= 200 && REQUEST.status < 300) {
          resolve(JSON.parse(REQUEST.response));
        } else {
          reject(REQUEST);
        }
      };
      REQUEST.send();
    });
  }
}
new Shttp().get("http://127.0.0.1:5000/1").then((e) => {
  console.log(e);
}).catch((e) => {
  console.log("===>", e);
});
