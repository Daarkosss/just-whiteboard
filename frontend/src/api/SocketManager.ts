// src/socket/SocketManager.ts
import { io, Socket } from "socket.io-client";
import { BoardObject, SOCKET_BASE_URL } from "../api/api";
import store from "../store/RootStore";

export type BoardIdWithObjects = {
  boardId: string;
  objects: BoardObject[];
}

class SocketManager {
  socket: Socket | null = null;
  boardId: string | null = null;

  connect(boardId: string) {
    this.boardId = boardId;

    this.socket = io(SOCKET_BASE_URL, {
      transports: ['websocket'],
      auth: {
        token: store.auth.user?.userToken
      }
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      this.socket?.emit('joinBoard', this.boardId, store.auth.user?._id);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    this.socket.on('canvas-change', (data) => {
      if (data.boardId === this.boardId) {
        console.log('Received canvas change:', data);
        store.boards.currentBoard.updateCanvas(data.objects);
      }
    });

    this.socket.on('cursor-position', (data) => {
      store.boards.currentBoard.updateCursorPosition(data);
    });
  }

  emitCanvasChange(data: any) {
    console.log('Emitting canvas change:', data);
    if (data.boardId) {
      this.socket?.emit('canvas-change', data);
    }
  }

  emitCursorPosition(data: any) {
    this.socket?.emit('cursor-position', data);
  }

  disconnect(boardId: string) {
    if (this.socket) {
      this.socket.emit('leaveBoard', boardId, store.auth.user?._id);
      this.socket.disconnect();
    }
  }
}

export default new SocketManager();
