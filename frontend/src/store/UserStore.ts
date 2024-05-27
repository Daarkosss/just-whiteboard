import { makeAutoObservable } from "mobx";


interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  token: string;
}

class UserStore {
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

  loadUserFromStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
  }

  logout() {
    this.user = null;
    localStorage.removeItem('user');
  }
}

export default new UserStore();
