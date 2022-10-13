import axios from "axios";

const instance = axios.create({
  baseURL: "https://pre-onboarding-selection-task.shop",
  timeout: 30_000,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      setAuthToken(token);
    } else {
      removeAuthToken();
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    const token = response.data.access_token;

    if (token) {
      localStorage.setItem("access_token", token);
    }

    return response;
  },
  (error) => Promise.reject(error)
);

export const setAuthToken = (token: string) => {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
  delete instance.defaults.headers.common["Authorization"];
};

export const post = (url: string, data: any) => {
  return instance.post(url, data);
};

export const get = (url: string) => {
  return instance.get(url);
};

export const put = (url: string, data: any) => {
  return instance.put(url, data);
};

export const del = (url: string) => {
  return instance.delete(url);
};

export const patch = (url: string, data: any) => {
  return instance.patch(url, data);
};

export const head = (url: string) => {
  return instance.head(url);
};

export const options = (url: string) => {
  return instance.options(url);
};
