import { makeAutoObservable } from "mobx";
import { api, Board } from "../api/api";

class BoardsStore {
  boards: Board[] = [];
  selectedBoard: Board | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchBoards() {
    this.loading = true;
    try {
      const boards = await api.getBoards();
      this.boards = boards;
    } catch (error: any) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  }

  async fetchBoard(id: string) {
    this.loading = true;
    try {
      const board = await api.getBoard(id);
      this.selectedBoard = board;
    } catch (error: any) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  }

  async createBoard(name: string) {
    this.loading = true;
    try {
      const newBoard = await api.createBoard(name);
      this.boards.push(newBoard);
    } catch (error: any) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  }

  async updateBoard(id: string, name: string) {
    this.loading = true;
    try {
      const updatedBoard = await api.updateBoard(id, name);
      const index = this.boards.findIndex(board => board._id === id);
      if (index !== -1) {
        this.boards[index] = updatedBoard;
      }
    } catch (error: any) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  }

  async deleteBoard(id: string) {
    this.loading = true;
    try {
      await api.deleteBoard(id);
      this.boards = this.boards.filter(board => board._id !== id);
    } catch (error: any) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  }
}

export default BoardsStore;
