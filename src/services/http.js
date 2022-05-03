import axios from "axios";
import storage from "@/utils/storage";

function transformRes(res) {
  return res?.data || {};
}

class Http {
  constructor() {
    this.$http = axios.create({
      baseURL: process.env.VUE_APP_URL,
    });
  }

  normalizeOptions(options) {
    const hasToken = storage.getItem("token");
    // console.log(hasToken.token);
    return {
      options,
      ...options,
      headers: {
        Authorization: hasToken,
      },
    };
  }

  get(endpoint, options = {}) {
    return this.$http
      .get(endpoint, this.normalizeOptions(options))
      .then(transformRes);
  }

  post(endpoint, body, options = {}) {
    return this.$http
      .post(endpoint, body, this.normalizeOptions(options))
      .then(transformRes);
  }

  put(endpoint, body, options = {}) {
    return this.$http
      .put(endpoint, body, this.normalizeOptions(options))
      .then(transformRes);
  }

  delete(endpoint) {
    return this.$http.delete(endpoint).then(transformRes);
  }
}

export default new Http();
