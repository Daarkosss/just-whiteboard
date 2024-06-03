import userStore from "../store/UserStore";

const backendHost = import.meta.env.VITE_BACKEND_HOST || window.location.hostname;
const backendPort = import.meta.env.VITE_BACKEND_PORT || '8080';
export const SOCKET_BASE_URL = "http://localhost:8085";
export const PATH_PREFIX = `http://${backendHost}:${backendPort}/`;

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

class API {

  async fetch<T>(
    method: Method,
    path: string,
    body?: unknown,
    headers: HeadersInit = {},
  ): Promise<T> {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined,
    } as RequestInit

    const response = await fetch(`${PATH_PREFIX}${path}`, options)
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errorMessage || 'Wrong server response!');
    } else {
      return data;
    }
  }

  async authorizedFetch<T>(
    method: Method,
    path: string,
    body?: unknown
  ): Promise<T> {
    return this.fetch<T>(
      method,
      path,
      body,
      { 'Authorization': `Bearer ${userStore.user!.userToken}` },
    );
  }
}

export const api = new API();
