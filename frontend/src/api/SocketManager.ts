import { io, Socket } from "socket.io-client";
import { SOCKET_BASE_URL } from "./api";
import UserStore from "../store/UserStore";

class SocketManager {
  private socket: Socket | null = null;

  constructor() {
    this.connect();
  }

  private connect(): void {
    this.socket = io(SOCKET_BASE_URL, {
      reconnection: false,
      query: {
        username: UserStore.user!.name,
      },
    });

    this.socket.on("connect", () => {
      console.log("Connected to socket");
    });

    this.socket.on("typing", (receivedUsername: string, isTyping: boolean) => {
      console.log('received typing', receivedUsername, isTyping);
    });

    this.socket.on("read_message", (res: string) => {
      console.log('received read message', res);
    });
  }

  public sendTypingSignal(isTyping: boolean): void {
    console.log('sending typing', isTyping);
    if (this.socket) {
      this.socket.emit("typing", {
        username: UserStore.user!.name,
        isTyping: isTyping,
      });
    }
  }

  public sendData(payload: { content: string }): void {
    console.log('sending message to socket', payload);
    if (this.socket) {
      this.socket.emit("send_message", {
        content: payload.content,
        username: UserStore.user!.name,
        messageType: "CLIENT",
      });
    }
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      console.log("Disconnected from socket");
    }
  }
}

export default SocketManager;
