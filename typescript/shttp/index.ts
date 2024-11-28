interface DATA_RESPONSE {
  status: number;
  value?: object | string;
}
enum methods {
  get = "GET",
  post = "POST",
  put = "PUT",
  delete = "DELETE",
}
//@ts-ignore
//ignoring ts duplicate name error wich happens because 
//the class in the transpiled file is has the same name with this class
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

  put(url: string, data: object, header = {}) {
    const REQUEST = new XMLHttpRequest();
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

/*
  ?Test the put method 
  new Shttp()
.put("http://127.0.0.1:5000/", { data: "John Doe Updated" })
.then((e) => {
    console.log(e);
})
.catch((e) => {
    console.log("===>", e);
}); */
