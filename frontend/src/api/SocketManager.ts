// src/socket/SocketManager.ts
import { io, Socket } from "socket.io-client";
import { BoardObject, SOCKET_BASE_URL } from "./api";
import store from "../store/RootStore";

export type BoardIdWithObjects = {
  boardId: string;
  objects: BoardObject[];
}

class SocketManager {
  socket: Socket | null = null;

  connect() {
    this.socket = io(SOCKET_BASE_URL, {
      transports: ['websocket'],
      auth: {
        token: store.auth.user?.userToken
      }
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    this.socket.on('canvas-change', (objects) => {
      console.log('Received canvas change:', objects);
      store.boards.currentBoard.updateCanvas(objects);
    });

    this.socket.on('cursor-position', (data) => {
      // Obsługa otrzymanych pozycji kursorów
      store.boards.currentBoard.updateCursorPosition(data);
    });
  }

  emitCanvasChange(data: BoardIdWithObjects) {
    console.log('Emitting canvas change:', data);
    if(data.boardId) {
      this.socket?.emit('canvas-change', data);
    }
  }

  // emitCursorPosition(data: any) {
  //   this.socket?.emit('cursor-position', data);
  // }

  disconnect() {
    this.socket?.disconnect();
  }
}

export default new SocketManager();
