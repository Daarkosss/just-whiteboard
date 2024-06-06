import { toast } from 'react-toastify';
import store from "../store/RootStore";

const backendHost = import.meta.env.VITE_BACKEND_HOST || window.location.hostname;
const backendPort = import.meta.env.VITE_BACKEND_PORT || '3000';
export const SOCKET_BASE_URL = "https://localhost:8085";
export const PATH_PREFIX = `https://${backendHost}:${backendPort}/`;

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
  dataUrl: string;
}

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
      toast.error(data.message || 'Wrong server response!');
      throw new Error(data.message || 'Wrong server response!');
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
      { 'Authorization': `Bearer ${store.auth.user?.userToken}` },
    );
  }

  async login(): Promise<User> {
    return this.authorizedFetch<User>(
      'POST',
      'user/login',
      { email: store.auth.user?.email }
    );
  }

  // Get all boards for the current user
  async getBoards(): Promise<Board[]> {
    console.log(store.auth.user?._id);
    return this.authorizedFetch<Board[]>('GET', `user/boards?userID=${store.auth.user?._id}`);
  }

  // Get a specific board by ID
  async getBoard(id: string): Promise<Board> {
    return this.authorizedFetch<Board>('GET', `board?id=${id}`);
  }

  // Create a new board
  async createBoard(name: string): Promise<Board> {
    return this.authorizedFetch<Board>(
      'POST',
      `board?userID=${store.auth.user?._id}`,
      { name }
  );
  }

  // Update a board by ID
  async updateBoard(id: string, name: string): Promise<Board> {
    return this.authorizedFetch<Board>(
      'PUT',
      `board?id=${id}&userID=${store.auth.user?._id}`,
      { name }
    );
  }

  // Delete a board by ID
  async deleteBoard(id: string): Promise<void> {
    return this.authorizedFetch<void>(
      'DELETE',
      `board?id=${id}&userID=${store.auth.user?._id}`
    );
  }

  // Get all objects for a specific board by ID
  async getBoardsObjects(id: string): Promise<any[]> {
    return this.authorizedFetch<any[]>('GET', `board/objects?id=${id}`);
  }
}

export const api = new API();
