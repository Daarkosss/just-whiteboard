import AuthStore from './AuthStore';
import CurrentBoardStore from './CurrentBoardStore';
import BoardsStore from './BoardsStore';

class RootStore {
  auth: AuthStore;
  currentBoard: CurrentBoardStore;
  boards: BoardsStore;

  constructor() {
    this.auth = new AuthStore();
    this.currentBoard = new CurrentBoardStore();
    this.boards = new BoardsStore();
  }
}

export default new RootStore();
