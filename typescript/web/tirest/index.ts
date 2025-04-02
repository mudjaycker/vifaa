type DATA_REQUEST = {
  payload: { [key: string]: any };
  headers?: {
    authorization: string;
  };
};

type DATA_RESPONSE = {
  status: number;
  value?: { [key: string]: any };
};

enum methods {
  get = "GET",
  post = "POST",
  put = "PUT",
  delete = "DELETE",
}
//@ts-ignore
//ignoring ts duplicate name error wich happens because
//the class in the transpiled file has the same name with this class
class Tirest {
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

  get(url: string, data: DATA_REQUEST ) {
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

const tirest = new Tirest();
export default tirest;
