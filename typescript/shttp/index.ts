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

  #mixinRequest(
    url: string,
    method: methods,
    data?: DATA_REQUEST
  ): Promise<DATA_RESPONSE> {
    const REQUEST = new XMLHttpRequest();

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
          let value =
            method == methods.delete
              ? REQUEST.statusText
              : JSON.parse(REQUEST.response);

          resolve({ status, value: value });
        } else {
          let [status, reason] = [REQUEST.status, REQUEST.statusText];
          let response = { status, reason };
          reject(response);
        }
      };
      method == methods.get || method == methods.delete
        ? REQUEST.send()
        : REQUEST.send(JSON.stringify(data?.payload));
    });
  }
  get(url: string, data: DATA_REQUEST | undefined = undefined) {
    return this.#mixinRequest(url, methods.get, data);
  }
  post(url: string, data: DATA_REQUEST) {
    return this.#mixinRequest(url, methods.post, data);
  }

  put(url: string, data: DATA_REQUEST) {
    return this.#mixinRequest(url, methods.put, data);
  }

  delete(url: string, data: DATA_REQUEST) {
    return this.#mixinRequest(url, methods.delete, data);
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
