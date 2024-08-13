import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { cookies } from 'next/headers';
import CryptoJS from 'crypto-js/rc4';
import { generateSignature } from '@/lib/generateSignature';
type MyHeader = {
  'Content-Type': string;
  Accept: string;
  Authorization?: string;
  'accept-language': string;
  'api-key-authorizer-deadline'?: number;
  'api-key-authorizer'?: string;
};

type ResponseData = AxiosResponse & {
  message?: string;
};

type RequestParams = {
  method: 'get' | 'delete' | 'put' | 'patch' | 'post';
  path: string;
  params?: object;
  token?: string;
};

const requestConfig: AxiosRequestConfig = {
  baseURL: process.env.BASE_URL,
};

export const setAuthToken = (token: string) => {
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
  delete axios.defaults.headers.common['Authorization'];
};

export const makeHeaders = (token?: string): MyHeader => {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'en';
  const { deadline, authorizeKey } = generateSignature(CryptoJS.encrypt);
  const headers: MyHeader = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'accept-language': locale,
    'api-key-authorizer-deadline': deadline,
    'api-key-authorizer': authorizeKey.toString(),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

export function makeRequest({ method, path, params, token }: RequestParams): AxiosRequestConfig {
  const extra = method === 'get' ? { params } : { data: params };
  const headers = makeHeaders(token);

  if (['put', 'patch', 'post'].includes(method) && params instanceof FormData) {
    headers['Accept'] = 'multipart/form-data';
    headers['Content-Type'] = 'multipart/form-data';
  }

  return {
    ...requestConfig,
    headers,
    method,
    url: path,
    ...extra,
  };
}

export function GET(path: string, params?: object, token?: string) {
  return makeRequest({ method: 'get', path, params, token });
}

export function DELETE(path: string, params?: object, token?: string) {
  return makeRequest({ method: 'delete', path, params, token });
}

export function PUT(path: string, params: object, token?: string) {
  return makeRequest({ method: 'put', path, params, token });
}

export function PATCH(path: string, params: object, token?: string) {
  return makeRequest({ method: 'patch', path, params, token });
}

export function POST(path: string, params: object, token?: string) {
  return makeRequest({ method: 'post', path, params, token });
}

export function fetchJson(req: AxiosRequestConfig) {
  return axios(req)
    .then((response: ResponseData) => {
      return Promise.resolve(response);
    })
    .catch((error: AxiosError) => {
      const response = error.response;
      const status = response ? response.status : 500;
      switch (status) {
        case 500:
        case 502:
        case 503:
        case 504:
          break;
        case 401:
          break;
        default:
          break;
      }
      return Promise.reject(new APIError(response, (response && response.data) || null));
    });
}

export class APIError extends Error {
  code = null;
  message = '';
  response;
  detail;
  constructor(resp: ResponseData | undefined, json: any) {
    super();
    this.name = 'APIError';
    this.stack = new Error().stack;
    if (json) {
      this.message = json.message;
    } else {
      this.message = resp ? resp.statusText : '';
    }
    this.response = resp;
    this.detail = json;
  }
}
