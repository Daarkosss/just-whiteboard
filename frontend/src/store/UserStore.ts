import { makeAutoObservable } from "mobx";
import RootStore from './RootStore';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  userToken: string;
}

class UserStore {
  rootStore: RootStore;
  user: User | null = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
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

export default UserStore;
