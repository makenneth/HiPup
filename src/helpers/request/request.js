export default class Request {
  constructor(url, method = "GET", data = null) {
    this.url = url;
    this.method = method;
    this.data = data;
  }

  getCSRF() {
    const els = document.getElementsByTagName("meta");
    for (let i = 0; i < els.length; i++) {
      if (els[i].getAttribute("name") === "csrf-token") {
        return els[i].getAttribute("content");
      }
    }

    return null;
  }

  getRequest() {
    return fetch(this.url, {
      credentials: 'same-origin',
    });
  }

  deleteRequest() {
    return fetch(this.url, {
      method: this.method,
      headers: {
        'X-CSRF-Token': this.getCSRF()
      },
      credentials: 'same-origin',
    });
  }

  requestWithData() {
    return fetch(this.url, {
      method: this.method,
      body: JSON.stringify(this.data),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.getCSRF()
      },
      credentials: 'same-origin',
    });
  }

  send() {
    if (this.method === "GET") {
      return this.getRequest();
    } else if (this.method === "DELETE") {
      return this.deleteRequest();
    }

    return this.requestWithData();
  }
}
