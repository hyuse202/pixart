import React, { useEffect, useState } from "react";
// import { Canvas, Object } from "fabric";
const Setting = ({ canvas }: any) => {
  const [selectObject, setSelectObject] = useState<any> (null);
  const [width, setWidth] = useState<number | any>(null);
  const [height, setHeight] = useState<number | any>(null);
  const [color, setColor] = useState<any>(null);
  const [diameter, setDiameter] = useState<number | any>(null);
  useEffect(() => {
    if (canvas) {
      canvas.on("selection:updated", (event: any) => {
        handleObjectSelection(event.selected[0]);
      });
      canvas.on("selection:create", (event: any) => {
        handleObjectSelection(event.selected[0]);
      });
      canvas.on("selection:clear", (event:any) => {
        setSelectObject(null)
        handleClearSetting()
      })
    }
  });

  const handleObjectSelection = (object: any) => {
    if (!object) return;
    setSelectObject(object);
    if (object.type === "rect") {
      setWidth(Math.round(object.width * object.scaleX));
      setHeight(Math.round(object.height * object.scaleY));
      setColor(object.fill);
      setDiameter("");
    } else if (object.type === "circle") {
      setDiameter(Math.round(object.radius * 2 * object.scaleX));
      setColor(object.fill);
      setWidth("");
      setHeight("");
    }
  };

  const handleClearSetting = () => {
    setWidth("")
    setHeight("")
    setColor("")
    setDiameter("")
  };
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "")
    const intValue = parseInt(value, 10)

    setWidth(value)
    if(selectObject && selectObject.type === "rect" && intValue >= 0) {
        selectObject.set({width: intValue / selectObject.scaleX})
        canvas.renderAll();
    }

  }
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "")
    const intValue = parseInt(value, 10)

    setHeight(value)
    if(selectObject && selectObject.type === "rect" && intValue >= 0) {
        selectObject.set({height: intValue / selectObject.scaleY})
        canvas.renderAll();
    }

  }
  return (
    <div className="h-[40rem] ">
    
        {selectObject  && selectObject.type === "rect" && (
            <>
            <input placeholder="type width" onChange={handleWidthChange} value={width} />
            <input placeholder="type height"onChange={handleHeightChange}value = {height} />
            </>
        )}
    </div>
  )
};
export default Setting;
