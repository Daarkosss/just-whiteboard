import { makeAutoObservable } from "mobx";
import { CredentialResponse } from '@react-oauth/google';

class UserStore {
  isAuthenticated: boolean = false;
  user: any = null;

  constructor() {
    makeAutoObservable(this);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.isAuthenticated = true;
    }
  }

  login(response: CredentialResponse) {
    if (response.credential) {
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      this.user = JSON.parse(jsonPayload);
      this.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(this.user));
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.user = null;
    localStorage.removeItem('user');
  }

  get userToken() {
    return localStorage.getItem(`CognitoIdentityServiceProvider.awsSecrets.aws_user_pools_web_client_id.${this.username}.accessToken`);
  }
}

export default new UserStore();
