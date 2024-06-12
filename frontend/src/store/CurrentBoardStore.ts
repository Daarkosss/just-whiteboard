// src/store/CurrentBoardStore.ts
import { makeAutoObservable } from 'mobx';
import { fabric } from 'fabric';
import { Handler } from 'react-design-editor';
import { Board, BoardObject } from '../api/api';
import store from './RootStore';
import socketManager from "../api/SocketManager";

export type UserCursor = { 
  userPhoto: string,
  mouseLeft: number,
  mouseTop: number 
};

export type UsersCursors = {
  [userId: string]: UserCursor
}

class CurrentBoardStore {
  board: Board | null = null;
  canvas: fabric.Canvas | null = null;
  handler: Handler | null = null;
  selectedObject: fabric.Object | null = null;
  color = '#000000';
  fontSize: number | '' = '';
  fontFamily = '';
  width: number | '' = '';
  height: number | '' = '';
  usersCursors: UsersCursors = {};

  constructor() {
    makeAutoObservable(this);
  }

  turnOnListeners() {
    if (this.canvas) {
      const events = [
        'object:modified',
        'object:removed',
        'object:added',
      ];
      
      events.forEach(event => {
        this.canvas?.on(event, this.emitCanvasChange);
      });
    }
  }

  turnOffListeners() {
    if (this.canvas) {
      const events = [
        'object:modified',
        'object:removed',
        'object:added',
      ];
      
      events.forEach(event => {
        this.canvas?.off(event, this.emitCanvasChange);
      });
    }
  }

  setCanvas(canvas: fabric.Canvas) {
    this.canvas = canvas;
    this.turnOnListeners();
  }

  setBoard(board: Board | null) {
    this.board = board;
  }

  setHandler(handler: Handler) {
    this.handler = handler;
  }

  emitCanvasChange = () => {
    if (!store.boards.isLoading && this.handler && this.board) {
      const objects = this.handler.exportJSON();
      const data = { boardId: this.board._id, objects };
      socketManager.emitCanvasChange(data);
    }
  }

  convertToFabricFormat(objects: BoardObject[]) {
    return {
      version: '4.6.0',
      objects: objects.map((object) => {
        if (object.type === 'circle' && !object.radius) {
          object.radius = object.width / 2;
        }
        return object;
      }),
    };
  }

  bringForward() {
    if (this.selectedObject) {
      this.selectedObject.bringForward();
    }
    console.log(this.handler?.exportJSON());
    this.emitCanvasChange()
  }

  bringToFront() {
    if (this.selectedObject) {
      this.selectedObject.bringToFront();
    }
    console.log(this.handler?.exportJSON());
    this.emitCanvasChange()
  }

  sendBackwards() {
    if (this.selectedObject) {
      this.selectedObject.sendBackwards();
    }
    this.emitCanvasChange()
  }

  sendToBack() {
    if (this.selectedObject) {
      this.selectedObject.sendToBack();
    }
    this.emitCanvasChange()
  }

  updateCanvas(data: BoardObject[]) {
    this.turnOffListeners();
    console.log(this.canvas)
    if (this.canvas) {
      const fabricData = this.convertToFabricFormat(data);
      this.canvas.loadFromJSON(fabricData, this.canvas.renderAll.bind(this.canvas));
      this.canvas.renderAll();
      console.log(this.canvas);
    }
    this.turnOnListeners();
  }

  setCursorPosition(mouseLeft: number, mouseTop: number) {
    const cursorPosition = {mouseLeft, mouseTop};
    socketManager.emitCursorPosition(cursorPosition);
  }

  updateCursorPosition(userCursor: { userId: string; userPhoto: string; mouseLeft: number; mouseTop: number }) {
    const { userId, userPhoto, mouseLeft, mouseTop } = userCursor;
    if (this.usersCursors[userId]) {
      this.usersCursors[userId].mouseLeft = mouseLeft;
      this.usersCursors[userId].mouseTop = mouseTop;
    } else {
      this.usersCursors[userId] = { userPhoto, mouseLeft, mouseTop };
    }
    // console.log(this.userStore)
  }

  getUserPositions() {
    return this.usersCursors;
  }

  setSelectedObject(selectedObject: fabric.Object | null) {
    if (selectedObject && '_objects' in selectedObject) {
      return;
    }

    this.selectedObject = selectedObject;
    if (selectedObject) {
      this.color = (selectedObject.get('fill') as string) || '#000000';
      if ('fontSize' in selectedObject) {
        this.fontSize = selectedObject.fontSize as number;
      } else {
        this.fontSize = '';
      }
      if ('fontFamily' in selectedObject) {
        this.fontFamily = selectedObject.fontFamily as string;
      } else {
        this.fontFamily = '';
      }
      if (selectedObject.width && selectedObject.scaleX) {
        this.width = selectedObject.width * selectedObject.scaleX;
      } else {
        this.width = '';
      }
      if (selectedObject.height && selectedObject.scaleY) {
        this.height = selectedObject.height * selectedObject.scaleY;
      } else {
        this.height = '';
      }
    } else {
      this.color = '#000000';
      this.fontSize = '';
      this.fontFamily = '';
      this.width = '';
      this.height = '';
    }
  }

  updateSelectedObjectSize() {
    const activeObject = this.canvas?.getActiveObject() as fabric.Object | null;

    if (this.selectedObject && activeObject && activeObject.scaleX && activeObject.scaleY) {
      this.width = Math.round(activeObject.scaleX * 100);
      this.height = Math.round(activeObject.scaleY * 100);
      this.emitCanvasChange();
    }
  }

  setColor(color: string) {
    console.log("Selected object:", this.selectedObject);
    this.color = color;
    if (this.selectedObject) {
      console.log('xD');
      this.selectedObject.set('fill', color);
      this.canvas?.renderAll();
      this.emitCanvasChange();
    }
  }

  setFontSize(fontSize: number) {
    console.log("Setting font size to:", fontSize);
    if (this.selectedObject && 'fontSize' in this.selectedObject) {
      (this.selectedObject as fabric.Textbox).set('fontSize', fontSize);
      this.canvas?.renderAll();
      this.emitCanvasChange();
    } else {
      console.error("Selected object is null or doesn't have fontSize property");
    }
    this.fontSize = fontSize;
  }

  setFontFamily(fontFamily: string) {
    console.log("Setting font family to:", fontFamily);
    if (this.selectedObject && 'fontFamily' in this.selectedObject) {
      (this.selectedObject as fabric.Textbox).set('fontFamily', fontFamily);
      this.canvas?.renderAll();
      this.emitCanvasChange();
    } else {
      console.error("Selected object is null or doesn't have fontFamily property");
    }
    this.fontFamily = fontFamily;
  }

  setWidth(width: number) {
    console.log("Setting width to:", width);
    if (this.selectedObject) {
      this.selectedObject.set('scaleX', width / 100);
      this.canvas?.renderAll();
      this.emitCanvasChange();
    } else {
      console.error("Selected object is null");
    }
    this.width = width;
  }

  setHeight(height: number) {
    console.log("Setting height to:", height);
    if (this.selectedObject) {
      this.selectedObject.set('scaleY', height / 100);
      this.canvas?.renderAll();
      this.emitCanvasChange();
    } else {
      console.error("Selected object is null");
    }
    this.height = height;
  }

  removeSelectedObject() {
    if (this.selectedObject) {
      this.canvas?.remove(this.selectedObject);
      this.setSelectedObject(null);
      this.canvas?.renderAll();
    } else {
      console.error("Selected object is null");
    }
  }

  reset() {
    this.turnOffListeners();
    this.board = null;
    this.canvas = null;
    this.selectedObject = null;
    this.color = '#000000';
    this.fontSize = '';
    this.fontFamily = '';
    this.width = '';
    this.height = '';
    this.usersCursors = {};
  }
}

export default CurrentBoardStore;
