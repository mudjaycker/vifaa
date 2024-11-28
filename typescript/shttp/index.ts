// shttp.ts
class Shttp {
  constructor() {}
  get(url: string, header = {}) {
    const REQUEST = new XMLHttpRequest();
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

  post(url: string, data: object, header = {}) {
    const REQUEST = new XMLHttpRequest();
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
}
/*  
?Test the get method
new Shttp().get("http://127.0.0.1:5000/").then((e) => {
    console.log(e);
  }).catch((e) => {
    console.log("===>",e);
  }); */

/* 
?Test the post method
new Shttp()
  .post("http://127.0.0.1:5000/", { data: "John Doe" })
  .then((e) => {
    console.log(e);
  })
  .catch((e) => {
    console.log("===>", e);
  }); */
