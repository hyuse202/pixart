"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, Rect } from 'fabric';
import Button from '@/components/Button';
const PixartApp = () => {
  const canvaRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  useEffect(() => {
    if(canvaRef.current){
      const initCanvas:any = new Canvas(canvaRef.current, {
        width: 500,
        height: 500
      })
      initCanvas.backgroundColor = "#fff"
      initCanvas.renderAll();

      setCanvas(initCanvas);

      return () => {
        initCanvas.dispose();
      }
    }
  }, [])
  const AddRect = () => {
    if(canvas){
      const rect = new Rect({
        top: 100,
        left: 50,
        width: 100,
        height: 50,
        fill: "#D84D42"
      })
      canvas.add(rect)
    }
  }
  return (
    <div className='min-h-screen flex items-center flex-col justify-center'>
      <Button type="button" className='text-white bg-gray-300' onClick={AddRect}>
       rect 
      </Button>  
      <canvas className="border-2 border-black" ref={canvaRef} />
    </div>
  );
};

export default PixartApp;
