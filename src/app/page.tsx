"use client";
import React, { useEffect, useRef, useState } from "react";
import { Canvas, Rect, Circle, Polygon, FabricImage, IText } from "fabric";
import Button from "@/components/Button";
import Setting from "@/components/Setting";
const PixartApp = () => {
  const canvaRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  useEffect(() => {
    if (canvaRef.current) {
      const initCanvas: any = new Canvas(canvaRef.current, {
        width: 1000,
        height: 800,
      });
      initCanvas.backgroundColor = "#fff";
      initCanvas.renderAll();

      setCanvas(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);
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
    if(canvas){
      const createText= new IText("a",{
        left:100,
        top:20
      });
      canvas.add(createText)
    }
  }
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
      </div>
      <div className="justify-center">
        <canvas className="border-2 border-black" ref={canvaRef} />
      </div>
      <input type="file" onChange={handleImageUpload} accept="image/*" />
      <Setting canvas={canvas} />
    </div>
  );
};

export default PixartApp;
