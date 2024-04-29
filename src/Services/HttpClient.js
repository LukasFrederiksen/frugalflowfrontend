import axios from "axios";

export default function HttpClient(baseURL) {
  const apiClient = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    get(endpoint, params = {}) {
      return apiClient.get(endpoint, { params }).then((response) => response);
    },

    post(endpoint, data) {
      if (data instanceof FormData) {
        delete apiClient.defaults.headers["Content-Type"];
      }
      return apiClient.post(endpoint, data).then((response) => response);
    },

    put(endpoint, data) {
      if (data instanceof FormData) {
        delete apiClient.defaults.headers["Content-Type"];
      }
      return apiClient.put(endpoint, data).then((response) => response);
    },

    delete(endpoint) {
      return apiClient.delete(endpoint).then((response) => response);
    },
  };
}
