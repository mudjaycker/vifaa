// index.ts
class Shttp {
  constructor() {
  }
  #mixinRequest(url, method, data) {
    const REQUEST = new XMLHttpRequest;
    REQUEST.open(method, url);
    REQUEST.setRequestHeader("Accept", "application/json");
    REQUEST.setRequestHeader("Content-Type", "application/json");
    if (data?.headers?.authorization) {
      REQUEST.setRequestHeader("Authorization", data.headers.authorization);
    }
    return new Promise((resolve, reject) => {
      REQUEST.onload = () => {
        if (REQUEST.status >= 200 && REQUEST.status < 400) {
          let status = REQUEST.status;
          let value = method == "DELETE" /* delete */ ? REQUEST.statusText : JSON.parse(REQUEST.response);
          resolve({ status, value });
        } else {
          let [status, reason] = [REQUEST.status, REQUEST.statusText];
          let response = { status, reason };
          reject(response);
        }
      };
      method == "GET" /* get */ || method == "DELETE" /* delete */ ? REQUEST.send() : REQUEST.send(JSON.stringify(data?.payload));
    });
  }
  get(url, data = undefined) {
    return this.#mixinRequest(url, "GET" /* get */, data);
  }
  post(url, data) {
    return this.#mixinRequest(url, "POST" /* post */, data);
  }
  put(url, data) {
    return this.#mixinRequest(url, "PUT" /* put */, data);
  }
  delete(url, data) {
    return this.#mixinRequest(url, "DELETE" /* delete */, data);
  }
}
new Shttp().delete("http://127.0.0.1:5000/", { payload: { name: "Jon Doe deleted" } }).then((e) => {
  console.log(e);
}).catch((e) => {
  console.log("===>", e);
});
