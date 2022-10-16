import axios, { AxiosRequestConfig } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AxiosRequestHeaders = AxiosRequestConfig<any>['headers'];

const instance = axios.create({
  baseURL: 'https://pre-onboarding-selection-task.shop',
  timeout: 30_000,
});

instance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error?.response?.data?.message != null) {
      return Promise.reject(new Error(error.response.data.message));
    } else {
      return Promise.reject(error);
    }
  }
);

export const post = <T>({
  url,
  data,
  headers,
}: {
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  headers?: AxiosRequestHeaders;
}) => {
  return instance.post<T>(url, data, { headers });
};

export const get = ({
  url,
  data,
  headers,
}: {
  url: string;
  data?: Record<string, string>;
  headers?: AxiosRequestHeaders;
}) => {
  const qs = new URLSearchParams(data).toString();
  if (qs.length > 0) {
    url = `${url}?${qs}`;
  }

  return instance.get(url, { headers });
};

export const put = <T>({
  url,
  data,
  headers,
}: {
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  headers: AxiosRequestHeaders;
}) => {
  return instance.put<T>(url, data, { headers });
};

export const del = ({
  url,
  headers,
}: {
  url: string;
  headers: AxiosRequestHeaders;
}) => {
  return instance.delete(url, { headers });
};
