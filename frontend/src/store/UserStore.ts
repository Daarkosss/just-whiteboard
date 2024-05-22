import { makeAutoObservable } from "mobx";


class UserStore {
    username = '';

    constructor() {
        makeAutoObservable(this);
    }

    get userToken() {
        return localStorage.getItem(`CognitoIdentityServiceProvider.awsSecrets.aws_user_pools_web_client_id.${this.username}.accessToken`);
    }
}

export default new UserStore();
