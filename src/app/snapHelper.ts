import { Line } from "fabric";

const snappingDistance = 10;

export const handleObjectMoving = (
  canvas: any,
  obj: any,
  guidelines: any,
  setGuidelines: any
) => {
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  const left = obj.left;
  const top = obj.top;
  const right = left + obj.width + obj.scaleX;
  const bottom = top + obj.height + obj.scaleY;

  const centerX = left + (obj.width * obj.scaleX) / 2;
  const centerY = right + (obj.height * obj.scaleY) / 2;

  let newGuidelines = [];
  clearGuidelines(canvas);

  let snapped = false;
  if (Math.abs(left) < snappingDistance) {
    obj.set({ left: 0 });
    if (!guidelinesExists(canvas, "vertical-left")) {
      const line = createVericalGuideline(canvas, 0, "vertical-left");
      newGuidelines.push(line);
      canvas.add(line);
    }
    snapped = true;
  }
  if (Math.abs(top) < snappingDistance) {
    obj.set({ top: 0 });
    if (!guidelinesExists(canvas, "horizontal-top")) {
      const line = createHorizontalGuideline(canvas, 0, "horizontal-top");
      newGuidelines.push(line);
      canvas.add(line);
    }
    snapped = true;
  }

  if(Math.abs(right - canvasWidth) < snappingDistance){
    obj.set({left: canvasWidth - obj.width * obj.scaleX})
    if(!guidelinesExists(canvas, "vertical-right")){
        const line = createVericalGuideline(
            canvas,
            canvasWidth,
            "vertical-right"
        )
        newGuidelines.push(line)
        canvas.add(line)
    }
    snapped = true
  }
  if(Math.abs(bottom - canvasHeight) < snappingDistance) {
    obj.set({top: canvasHeight - obj.height * obj.scaleY})
    if(!guidelinesExists(canvas, "horizontal-bottom")) {
        const line = createHorizontalGuideline(
            canvas,
            canvasHeight,
            "horizontal-bottom"
        )
        newGuidelines.push(line)
        canvas.add(line)
    }
    snapped = true
  }
  if(Math.abs(centerX - canvasWidth / 2) < snappingDistance) {
    obj.set({left: canvasWidth / 2 - (obj.width * obj.scaleX) / 2})
    if(!guidelinesExists(canvas, "vertical-center")) {
        const line = createVericalGuideline(
            canvas,
            canvasWidth / 2,
            "vertical-center"
        )
        newGuidelines.push(line)
        canvas.add(line)
    }
    snapped = true
  }
  if(Math.abs(centerY - canvasHeight / 2) < snappingDistance) {
    obj.set({top: canvasHeight / 2 - (obj.height * obj.scaleY) / 2})
    if(!guidelinesExists(canvas, "horizontal-center")) {
        const line = createHorizontalGuideline(
            canvas,
            canvasHeight / 2,
            "horizontal-center"
        )
        newGuidelines.push(line)
        canvas.add(line)
    }
    snapped = true
  }
  if(!snapped) {
    clearGuidelines(canvas)

  } else{
    setGuidelines(newGuidelines)
  }
  canvas.renderAll()
};
export const clearGuidelines = (canvas:any) => {
    const objects = canvas.getObjects("line");
    objects.forEach((obj:any) => {
        if(
            (obj.id  && obj.id .startsWith("vertical-")) || 
            obj.id.startsWith("horizontal-")
        ){
            canvas.remove(obj)
        }
    })
    canvas.renderAll()
}
export const createVericalGuideline = (canvas: any, x: any, id: any) => {
  return new Line([x, 0, x, canvas.height], {
    id,
    stroke: "red",
    strokeWidth: 1,
    selectable: false,
    evented: false,
    strokeDashArray: [5, 5],
    opacity: 0.8,
  });
};

export const createHorizontalGuideline = (canvas: any, y: any, id: any) => {
  return new Line([0, y, canvas.width, y], {
    id,
    stroke: "red",
    strokeWidth: 1,
    selectable: false,
    evented: false,
    strokeDashArray: [5, 5],
    opacity: 0.8,
  });
};
const guidelinesExists = (canvas: any, id:any) =>  {
    const objects = canvas.getObjects("line");
    return objects.some((obj: any) => obj.id === id)
}
