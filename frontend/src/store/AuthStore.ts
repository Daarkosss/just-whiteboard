import { makeAutoObservable } from "mobx";
import { api } from "../api/api";
import store from "./RootStore";

export interface User {
  _id: string;
  ssoID: string;
  name: string;
  email: string;
  avatar: string;
  userToken: string;
}

class AuthStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.loadUserFromStorage();
    }
  }

  setUser(user: User) {
    this.user = user;
  }

  saveUserToStorage(user?: User) {
    if (user) {
      this.user = user;
    }
    if (this.user) {
      localStorage.setItem('user', JSON.stringify(this.user));
    }
  }

  loadUserFromStorage() {
      this.user = this.getUserFromStorage();
  }

  getUserFromStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }

  async login(): Promise<User | null> {
    const responseUser = await api.login();
    const storageUser = this.getUserFromStorage();
    if (storageUser && responseUser) {
      this.user = { 
        ...storageUser,
        _id: responseUser._id
      };
      console.log(this.user);
      this.saveUserToStorage();
    } else {
      store.reset();
    }
    return this.user;
  }

  reset() {
    this.user = null;
    localStorage.removeItem('user');
  }
}

export default AuthStore;
