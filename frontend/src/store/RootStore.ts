import AuthStore from './AuthStore';
import BoardsStore from './BoardsStore';

class RootStore {
  auth: AuthStore;
  boards: BoardsStore;

  constructor() {
    this.auth = new AuthStore();
    this.boards = new BoardsStore();
  }
}

export default new RootStore();
