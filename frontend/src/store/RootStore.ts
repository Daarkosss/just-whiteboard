import UserStore from './UserStore';
import CanvasStore from './CanvasStore';
import BoardStore from './BoardStore';

class RootStore {
  userStore: UserStore;
  canvasStore: CanvasStore;
  boardStore: BoardStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.canvasStore = new CanvasStore(this);
    this.boardStore = new BoardStore(this);
  }
}

export default RootStore;
