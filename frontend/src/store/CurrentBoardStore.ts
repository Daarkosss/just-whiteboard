// src/store/CanvasStore.ts
import { makeAutoObservable } from 'mobx';
import { fabric } from 'fabric';
import { Handler } from 'react-design-editor';

class CurrentBoardStore {
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

  setCanvas(canvas: fabric.Canvas) {
    this.canvas = canvas;
  }

  setHandler(handler: Handler) {
    this.handler = handler;
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
