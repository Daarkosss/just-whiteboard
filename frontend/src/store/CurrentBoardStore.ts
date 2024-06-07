// src/store/CurrentBoardStore.ts
import { makeAutoObservable } from 'mobx';
import { fabric } from 'fabric';
import { Handler } from 'react-design-editor';
import { Board, BoardObject } from '../api/api';
import socketManager from "../api/SocketManager";

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

  constructor() {
    makeAutoObservable(this);
  }

  turnOnListeners() {
    if (this.canvas) {
      const events = [
        'object:modified',
        'selection:updated',
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
        'selection:updated',
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
    console.log(this.canvas);
    if (this.canvas) {
      const objects = this.canvas.getObjects().map(obj => obj.toJSON());
      const data = { boardId: this.board?._id, objects };
      console.log(data);
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

  setCursorPosition(left: number, top: number) {
    const data = { left, top };
    socketManager.emitCursorPosition(data);
  }

  updateCursorPosition(data: any) {
    // Aktualizuj pozycje kursorów innych użytkowników
  }

  setSelectedObject(selectedObject: fabric.Object | null) {
    this.selectedObject = selectedObject;
    console.log("Selected object:", this.selectedObject);
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
      this.width = selectedObject.width || '';
      this.height = selectedObject.height || '';
    } else {
      this.color = '#000000';
      this.fontSize = '';
      this.fontFamily = '';
      this.width = '';
      this.height = '';
    }
  }

  setColor(color: string) {
    console.log("Selected object:", this.selectedObject);
    this.color = color;
    if (this.selectedObject) {
      this.selectedObject.set('fill', color);
      this.canvas?.renderAll();
      this.canvas?.fire('object:modified', { target: this.selectedObject });
    }
  }

  setFontSize(fontSize: number) {
    console.log("Setting font size to:", fontSize);
    if (this.selectedObject && 'fontSize' in this.selectedObject) {
      (this.selectedObject as fabric.Textbox).set('fontSize', fontSize);
      this.canvas?.renderAll();
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
    } else {
      console.error("Selected object is null or doesn't have fontFamily property");
    }
    this.fontFamily = fontFamily;
  }

  setWidth(width: number) {
    console.log("Setting width to:", width);
    if (this.selectedObject) {
      this.selectedObject.set('width', width);
      this.canvas?.renderAll();
    } else {
      console.error("Selected object is null");
    }
    this.width = width;
  }

  setHeight(height: number) {
    console.log("Setting height to:", height);
    if (this.selectedObject) {
      this.selectedObject.set('height', height);
      this.canvas?.renderAll();
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
}

export default CurrentBoardStore;
