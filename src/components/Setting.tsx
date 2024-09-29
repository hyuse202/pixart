import React, { useEffect, useState } from "react";
// import { Canvas, Object } from "fabric";
const fontFamilies = [
  "Arial",
  "Courier New",
  "Georgia",
  "Times New Roman",
  "Verdana",
  "Comic Sans MS",
  "Impact",
];
const Setting = ({ canvas }: any) => {
  const [selectObject, setSelectObject] = useState<any>(null);
  const [width, setWidth] = useState<number | any>(null);
  const [height, setHeight] = useState<number | any>(null);
  const [color, setColor] = useState<any>(null);
  const [diameter, setDiameter] = useState<number | any>(null);
  const [fontsize, setFontsize] = useState<any>(null);
  const [fontfamily, setFontfamily] = useState<any>(null)
  useEffect(() => {
    if (canvas) {
      canvas.on("selection:updated", (event: any) => {
        handleObjectSelection(event.selected[0]);
      });
      canvas.on("selection:create", (event: any) => {
        handleObjectSelection(event.selected[0]);
      });
      canvas.on("selection:clear", () => {
        setSelectObject(null);
        handleClearSetting();
      });
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
    setWidth("");
    setHeight("");
    setColor("");
    setDiameter("");
  };
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    const intValue = parseInt(value, 10);

    setWidth(value);
    if (selectObject && selectObject.type === "rect" && intValue >= 0) {
      selectObject.set({ width: intValue / selectObject.scaleX });
      canvas.renderAll();
    }
  };
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    const intValue = parseInt(value, 10);

    setHeight(value);
    if (selectObject && selectObject.type === "rect" && intValue >= 0) {
      selectObject.set({ height: intValue / selectObject.scaleY });
      canvas.renderAll();
    }
  };
  const handleDiameterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    const intValue = parseInt(value, 10);

    setDiameter(value);
    if (selectObject && selectObject.type === "circle" && intValue >= 0) {
      selectObject.set({ radius: intValue / 2 / selectObject.scaleX });
      canvas.renderAll();
    }
  };
  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    const intValue = parseInt(value, 10);
    // console.log(intValue);
    setFontsize(value);
    if (selectObject && selectObject.type === "i-text" && intValue >= 0) {
      selectObject.set({ fontSize: intValue });
      canvas.renderAll();
    }
  };
  const handleFontFamilyChange = (e: any) => {
    const value = e
    // const intValue = parseInt(value, 10);
    // console.log(intValue);
    setFontfamily(value);
    if (selectObject && selectObject.type === "i-text" ) {
      selectObject.set({ fontFamily: value });
      canvas.renderAll();
    }
  };
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setColor(value);
    if (selectObject) {
      selectObject.set({ fill: value });
      canvas.renderAll();
    }
  };

  return (
    <div className="w-[15rem]">
      {selectObject && selectObject.type === "rect" && (
        <div className="flex flex-col h-[20rem] items-center justify-center">
          <div className="border-2 h-[20rem] border-black flex flex-col rounded item-center justify-center shadow-xl space-y-4">
            <p className="text-xl font-semibolds text-center">Width</p>

            <input
              placeholder="type width"
              onChange={handleWidthChange}
              value={width}
            />
            <p className="text-xl font-semibolds text-center">Height</p>

            <input
              placeholder="type height"
              onChange={handleHeightChange}
              value={height}
            />
            <p className="text-xl font-semibolds text-center">Color</p>
            <input
              type="color"
              id="favcolor"
              name="favcolor"
              onChange={handleColorChange}
            ></input>
          </div>
        </div>
      )}
      {selectObject && selectObject.type === "circle" && (
        <div className="flex flex-col h-[20rem] items-center justify-center">
          <div className="border-2 h-[20rem] border-black flex flex-col rounded item-center justify-center shadow-xl space-y-4">
            <p className="text-xl font-semibolds text-center">Diameter</p>
            <input
              placeholder="type diameter"
              onChange={handleDiameterChange}
              value={diameter}
            />
            <p className="text-xl font-semibolds text-center">Color</p>
            <input
              type="color"
              id="favcolor"
              name="favcolor"
              className=""
              onChange={handleColorChange}
            ></input>
          </div>
        </div>
      )}
      {selectObject && selectObject.type === "i-text" && (
        <div className="flex flex-col h-[40rem] items-center justify-center">
          <div className="border-2 h-[20rem] border-black flex flex-col rounded item-center justify-center shadow-xl space-y-4">
            <p className="text-xl font-semibolds text-center">Fontsize</p>
            <input
              placeholder="type fontsize"
              onChange={handleFontSizeChange}
              value={fontsize}
            />
            <select
              id="font-family"
              value={fontfamily}
              onChange={(e) => handleFontFamilyChange(e.target.value)}
            >
              {fontFamilies.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
            <p className="text-xl font-semibolds text-center">Color</p>
            <input
              type="color"
              id="favcolor"
              name="favcolor"
              className=""
              onChange={handleColorChange}
            ></input>
          </div>
        </div>
      )}
    </div>
  );
};
export default Setting;
