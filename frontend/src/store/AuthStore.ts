import { makeAutoObservable } from "mobx";
import { api } from "../api/api";

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

  saveUserToStorage() {
    if (this.user) {
      localStorage.setItem('user', JSON.stringify(this.user));
    }
  }

  loadUserFromStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
  }

  login() {
    api.login().then((user) => {
      if (this.user) {
        this.user._id = user._id;
        this.saveUserToStorage();
      }
    });
  }

  logout() {
    this.user = null;
    localStorage.removeItem('user');
  }
}

export default AuthStore;
