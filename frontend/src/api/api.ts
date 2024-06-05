import { useStore } from '../store/StoreProvider';

const backendHost = import.meta.env.VITE_BACKEND_HOST || window.location.hostname;
const backendPort = import.meta.env.VITE_BACKEND_PORT || '8080';
export const SOCKET_BASE_URL = "http://localhost:8085";
export const PATH_PREFIX = `http://${backendHost}:${backendPort}/`;

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Board {
  _id: string;
  owner: User;
  name: string;
  createdAt: string;
  updatedAt: string;
}

class API {
  rootStore = useStore();

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
      { 'Authorization': `Bearer ${this.rootStore.userStore.user!.userToken}` },
    );
  }

// Get all boards for the current user
async getBoards(): Promise<Board[]> {
  return this.authorizedFetch<Board[]>('GET', 'boards/all');
}

// Get a specific board by ID
async getBoard(id: string): Promise<Board> {
  return this.authorizedFetch<Board>('GET', `boards?id=${id}`);
}

// Create a new board
async createBoard(name: string): Promise<Board> {
  return this.authorizedFetch<Board>('POST', 'boards', { name });
}

// Update a board by ID
async updateBoard(id: string, name: string): Promise<Board> {
  return this.authorizedFetch<Board>('PUT', `boards?id=${id}`, { name });
}

// Delete a board by ID
async deleteBoard(id: string): Promise<void> {
  return this.authorizedFetch<void>('DELETE', `boards?id=${id}`);
}

// Get all objects for a specific board by ID
async getBoardsObjects(id: string): Promise<any[]> {
  return this.authorizedFetch<any[]>('GET', `boards/objects?id=${id}`);
}
}

export const api = new API();
