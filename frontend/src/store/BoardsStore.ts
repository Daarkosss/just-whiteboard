import { makeAutoObservable } from "mobx";
import { api, Board } from "../api/api";
import CurrentBoardStore from "./CurrentBoardStore";
import store from "./RootStore";

class BoardsStore {
  currentBoard: CurrentBoardStore
  boards: Board[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.currentBoard = new CurrentBoardStore();
  }

  async fetchBoards() {
    this.isLoading = true;
    console.log(this.isLoading);
    try {
      console.log(store.auth.user?._id);
      const boards = await api.getBoards();
      this.boards = boards;
    } catch (error: any) {
      this.error = error.message;
    } finally {
      this.isLoading = false;
      console.log(this.isLoading);
    }
  }

  async fetchBoard(id: string) {
    this.isLoading = true;
    try {
      const board = await api.getBoard(id);
      this.currentBoard.board = board;
    } catch (error: any) {
      this.error = error.message;
    } finally {
      this.isLoading = false;
    }
  }

  async createBoard(name: string) {
    this.isLoading = true;
    try {
      const newBoard = await api.createBoard(name);
      this.boards.push(newBoard);
    } catch (error: any) {
      this.error = error.message;
    } finally {
      this.isLoading = false;
    }
  }

  async updateBoard(id: string, name: string) {
    this.isLoading = true;
    try {
      const updatedBoard = await api.updateBoard(id, name);
      const index = this.boards.findIndex(board => board._id === id);
      if (index !== -1) {
        this.boards[index] = updatedBoard;
      }
    } catch (error: any) {
      this.error = error.message;
    } finally {
      this.isLoading = false;
    }
  }

  async deleteBoard(id: string) {
    this.isLoading = true;
    try {
      await api.deleteBoard(id);
      this.boards = this.boards.filter(board => board._id !== id);
    } catch (error: any) {
      this.error = error.message;
    } finally {
      this.isLoading = false;
    }
  }

  reset() {
    this.boards = [];
    this.currentBoard = new CurrentBoardStore();
    this.isLoading = false;
    this.error = null;
  }
}

export default BoardsStore;
