import AuthStore from './AuthStore';
import BoardsStore from './BoardsStore';

class RootStore {
  auth: AuthStore;
  boards: BoardsStore;

  constructor() {
    this.auth = new AuthStore();
    this.boards = new BoardsStore();
  }

  reset() {
    this.auth.reset();
    this.boards.reset();
  }
}

export default new RootStore();
