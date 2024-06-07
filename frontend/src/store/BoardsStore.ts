import { makeAutoObservable } from "mobx";
import { api, Board, Error } from "../api/api";
import CurrentBoardStore from "./CurrentBoardStore";

class BoardsStore {
  currentBoard: CurrentBoardStore
  userBoards: Board[] = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.currentBoard = new CurrentBoardStore();
  }

  async fetchBoards() {
    this.isLoading = true;
    this.userBoards = await api.getBoards();
    this.isLoading = false;
  }

  async fetchBoard(id: string) {
    this.isLoading = true;
    try {
      const { board, objects } = await api.getBoardsObjects(id);
      this.currentBoard.board = board;
      console.log(this.currentBoard.board);
      this.currentBoard.updateCanvas(objects);
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
    } finally {
      this.isLoading = false;
    }
  }

  async createBoard(name: string) {
    this.isLoading = true;
    try {
      const newBoard = await api.createBoard(name);
      this.userBoards.push(newBoard);
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
    } finally {
      this.isLoading = false;
    }
  }

  async updateBoard(id: string, name: string) {
    this.isLoading = true;
    try {
      const updatedBoard = await api.updateBoard(id, name);
      const index = this.userBoards.findIndex(board => board._id === id);
      if (index !== -1) {
        this.userBoards[index] = updatedBoard;
      }
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
    } finally {
      this.isLoading = false;
    }
  }

  async deleteBoard(id: string) {
    this.isLoading = true;
    try {
      await api.deleteBoard(id);
      this.userBoards = this.userBoards.filter(board => board._id !== id);
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
    } finally {
      this.isLoading = false;
    }
  }

  getUserBoardById(id: string) {
    return this.userBoards.find(board => board._id === id);
  }

  reset() {
    this.userBoards = [];
    this.currentBoard = new CurrentBoardStore();
    this.isLoading = false;
  }
}

export default BoardsStore;
