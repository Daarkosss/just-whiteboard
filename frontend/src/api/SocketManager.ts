// src/socket/SocketManager.ts
import { io, Socket } from "socket.io-client";
import { SOCKET_BASE_URL } from "../api/api";
import store from "../store/RootStore";
import { FabricObject } from "react-design-editor";

export type BoardIdWithObjects = {
  boardId: string;
  objects: FabricObject<fabric.Object>[];
}

export type CursorPosition = {
  mouseLeft: number;
  mouseTop: number;
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
      const userId = store.auth.user?._id;
      if (data.userId === userId) {
        return;
      }
      store.boards.currentBoard.updateCursorPosition(data);
    });
  }

  emitCanvasChange(boardWithObjects: BoardIdWithObjects) {
    console.log('Emitting canvas change:', boardWithObjects);
    if (boardWithObjects.boardId) {
      this.socket?.emit('canvas-change', boardWithObjects);
    }
  }

  emitCursorPosition(cursorPosition: CursorPosition) {
    const { mouseLeft, mouseTop } = cursorPosition;
    if (store.boards.currentBoard.board?._id && store.auth.user?._id && store.auth.user?.avatar) {
      const cursorData = {
        boardId: store.boards.currentBoard.board?._id,
        userId: store.auth.user?._id,
        userPhoto: store.auth.user?.avatar,
        mouseLeft: mouseLeft,
        mouseTop: mouseTop
      };
      this.socket?.emit('cursor-position', cursorData);
    }
  }

  disconnect(boardId: string) {
    if (this.socket && store.auth.user?._id) {
      this.socket.emit('leaveBoard', boardId, store.auth.user._id);
      this.socket.disconnect();
    }
  }
}

export default new SocketManager();
