"use client";
import React, { useEffect, useRef, useState } from "react";
import { Canvas, Rect, Circle, Polygon, FabricImage, IText } from "fabric";
import Button from "@/components/Button";
import Setting from "@/components/Setting";
const PixartApp = () => {
  const canvaRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<Canvas | any>("");
  const [undoStack, setUndoStack] = useState<any>([]);
  const [redoStack, setRedoStack] = useState<any>([]);
  const [history, setHistory] = useState<string | any>([]);
  useEffect(() => {
    if (canvaRef.current) {
      const initCanvas: any = new Canvas(canvaRef.current, {
        width: 1700,
        height: 800,
      });
      initCanvas.backgroundColor = "#fff";
      // initCanvas.renderAll();
      // const jsonData = '{"objects":[{"type":"rect","originX":"center","originY":"center","left":300,"top":150,"width":150,"height":150,"fill":"#29477F","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":{"color":"rgba(94, 128, 191, 0.5)","blur":5,"offsetX":10,"offsetY":10},"visible":true,"clipTo":null,"rx":0,"ry":0,"x":0,"y":0},{"type":"circle","originX":"center","originY":"center","left":300,"top":400,"width":200,"height":200,"fill":"rgb(166,111,213)","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":{"color":"#5b238A","blur":20,"offsetX":-20,"offsetY":-10},"visible":true,"clipTo":null,"radius":100}],"background":""}'
      // canvas.loadFromJSON(jsonData).then(function(){canvas.renderAll()})
      setCanvas(initCanvas);

      // Save the initial state to history
      saveToHistory(initCanvas);

      // Save history whenever an object is added, modified, or removed
      const saveHistory = () => saveToHistory(initCanvas);
      initCanvas.on("object:added", saveHistory);
      initCanvas.on("object:modified", saveHistory);
      initCanvas.on("object:removed", saveHistory);

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  const saveToHistory = (canvasInstance: Canvas) => {
    const json = JSON.stringify(canvasInstance.toJSON());
    setHistory((prevHistory: any) => [...prevHistory, json]);
  };

  const handleUndo = () => {
    if (history.length > 1) {
      const currentState = history[history.length - 1];
      const newHistory = history.slice(0, -1 + history.length);
      setHistory(history);
      setRedoStack([currentState, ...redoStack]);

      const previousState = newHistory[newHistory.length - 1];
      console.log({ history, newHistory, previousState });
      loadCanvasState(previousState["object"]);
    }
  };

  // Redo functionality
  const handleRedo = () => {
    if (redoStack.length > 0) {
      const redoState = redoStack[0];
      const newRedoStack = redoStack.slice(1);
      setRedoStack(newRedoStack);

      setHistory([...history, redoState]);
      loadCanvasState(redoState["object"]);
    }
  };

  // Load the canvas state from JSON
  const loadCanvasState = (state: string) => {
    if (canvas && state) {
      // canvas.loadFromJSON(state, () => {
      //   console.log(state)
      //   canvas.renderAll();
      // });
      // const jsonData = '{"objects":[{"type":"rect","originX":"center","originY":"center","left":300,"top":150,"width":150,"height":150,"fill":"#29477F","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":{"color":"rgba(94, 128, 191, 0.5)","blur":5,"offsetX":10,"offsetY":10},"visible":true,"clipTo":null,"rx":0,"ry":0,"x":0,"y":0},{"type":"circle","originX":"center","originY":"center","left":300,"top":400,"width":200,"height":200,"fill":"rgb(166,111,213)","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":{"color":"#5b238A","blur":20,"offsetX":-20,"offsetY":-10},"visible":true,"clipTo":null,"radius":100}],"background":""}'
      // canvas.loadFromJSON(jsonData).then(function(){canvas.renderAll()})
    }
  };

  const AddRect = () => {
    if (canvas) {
      const rect = new Rect({
        top: 100,
        left: 50,
        width: 100,
        height: 50,
        fill: "#D84D42",
      });
      canvas.add(rect);
    }
  };
  const AddCircle = () => {
    if (canvas) {
      const circle = new Circle({
        top: 100,
        left: 150,
        radius: 60,
        fill: "#2F4DC6",
      });
      canvas.add(circle);
    }
  };
  const AddStar = () => {
    if (canvas) {
      const starPoints = [
        { x: 50, y: 0 },
        { x: 61, y: 35 },
        { x: 98, y: 35 },
        { x: 68, y: 57 },
        { x: 79, y: 91 },
        { x: 50, y: 70 },
        { x: 21, y: 91 },
        { x: 32, y: 57 },
        { x: 2, y: 35 },
        { x: 39, y: 35 },
      ];

      const star = new Polygon(starPoints, {
        top: 100,
        left: 200,
        fill: "#FFD700", // Golden color
      });

      canvas.add(star);
    }
  };
  const AddText = () => {
    if (canvas) {
      const createText = new IText("Tap to type", {
        left: 100,
        top: 20,
      });
      canvas.add(createText);
    }
  };
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && canvas) {
      const file = e.target.files[0];
      const reader = new FileReader();

      // Read the image file as Data URL
      reader.onload = async function (f) {
        const data = f.target?.result as string;
        try {
          // Use fabric.Image.fromURL to load the image
          const img = await FabricImage.fromURL(data);
          img.scaleToWidth(200); // Scale image to fit within canvas
          img.scaleToHeight(200);
          canvas.add(img);
          canvas.renderAll();
        } catch (error) {
          console.error("Error loading image:", error);
        }
      };

      reader.readAsDataURL(file); // Convert image to data URL
    }
  };
  const fileInputRef: any = React.useRef(null);
  const exportToPNG = () => {
    if (canvaRef.current) {
      const dataURL = canvaRef.current.toDataURL("image/jpeg", {
        format: "png",
        quality: 1.0,
      });
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "canvas-image.png";
      link.click();
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="flex flex-row mb-10 space-x-3 mt-10">
        <Button
          type="button"
          className="text-white bg-gray-300"
          onClick={AddRect}
        >
          rect
        </Button>
        <Button
          type="button"
          className="text-white bg-gray-300"
          onClick={AddCircle}
        >
          circle
        </Button>
        <Button
          type="button"
          className="text-white bg-gray-300"
          onClick={AddStar}
        >
          star
        </Button>
        <Button
          type="button"
          className="text-white bg-gray-300"
          onClick={AddText}
        >
          text
        </Button>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
          ref={fileInputRef}
        />
        <Button
          type="button"
          className="text-white bg-gray-300"
          onClick={() => fileInputRef.current.click()}
        >
          Upload Image
        </Button>
        <Button
          type="button"
          className="text-white bg-gray-300"
          onClick={handleRedo}
        >
          redo
        </Button>
        <Button
          type="button"
          className="text-white bg-gray-300"
          onClick={handleUndo}
        >
          undo
        </Button>
        <Button
          type="button"
          className="text-white bg-gray-300"
          onClick={exportToPNG}
        >
          export to png
        </Button>
      </div>
      <div className="justify-center flex flex-row space-x-8">
        <canvas className="border-2 border-black" ref={canvaRef} />
        <Setting canvas={canvas} />
      </div>

      {/* <input type="file" onChange={handleImageUpload} accept="image/*" /> */}
    </div>
  );
};

export default PixartApp;
