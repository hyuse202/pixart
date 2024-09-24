"use client";
import React, { useEffect, useRef, useState } from "react";
import { Canvas, Rect, Circle, Polygon } from "fabric";
import Button from "@/components/Button";
const PixartApp = () => {
  const canvaRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  useEffect(() => {
    if (canvaRef.current) {
      const initCanvas: any = new Canvas(canvaRef.current, {
        width: 500,
        height: 500,
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
      canvas.add(circle)
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
        fill: '#FFD700', // Golden color
      });

      canvas.add(star);
    }
  };
  return (
    <div className="min-h-screen flex items-center flex-col justify-center">
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
      <canvas className="border-2 border-black" ref={canvaRef} />
    </div>
  );
};

export default PixartApp;
