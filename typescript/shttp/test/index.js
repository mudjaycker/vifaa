// index.ts
class Shttp {
  constructor() {
  }
  get(url, header = {}) {
    const REQUEST = new XMLHttpRequest;
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
  post(url, data, header = {}) {
    const REQUEST = new XMLHttpRequest;
    REQUEST.open("POST", url);
    REQUEST.setRequestHeader("Accept", "application/json");
    REQUEST.setRequestHeader("Content-Type", "application/json");
    return new Promise((resolve, reject) => {
      REQUEST.onload = () => {
        if (REQUEST.status >= 200 && REQUEST.status < 300) {
          resolve(JSON.parse(REQUEST.response));
        } else {
          reject(REQUEST);
        }
      };
      REQUEST.send(JSON.stringify(data));
    });
  }
  put(url, data, header = {}) {
    const REQUEST = new XMLHttpRequest;
    REQUEST.open("PUT", url);
    REQUEST.setRequestHeader("Accept", "application/json");
    REQUEST.setRequestHeader("Content-Type", "application/json");
    return new Promise((resolve, reject) => {
      REQUEST.onload = () => {
        if (REQUEST.status >= 200 && REQUEST.status < 300) {
          resolve(JSON.parse(REQUEST.response));
        } else {
          reject(REQUEST);
        }
      };
      REQUEST.send(JSON.stringify(data));
    });
  }
}
new Shttp().put("http://127.0.0.1:5000/", { data: "John Doe Updated" }).then((e) => {
  console.log(e);
}).catch((e) => {
  console.log("===>", e);
});
