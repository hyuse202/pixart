import React, { use, useEffect, useState } from "react";

import { Canvas } from "fabric";

function LayerList({canvas} : any) {
    const [layers, setLayers] = useState<any>([])
    const [selectedLayer, setSelectedLayer] = useState<any>(null)
    
    const addToObject = (object:any) => {
        if(!object.id) {
            const timestamp = new Date().getTime()
            object.id = `${object.type}_${timestamp}`
        }
    }

    Canvas.prototype.updateZIndices = function (){
        const object = this.getObjects()
        object.forEach((obj: any, id: any) => {
            addToObject(obj)
            obj.zIndex = id
        })
    }
    
    const handleObjectSelected = (e: any) => {
        const selectObjected = e.selected ? e.selected[0]: null
        if(selectObjected) {
            setSelectedLayer(selectObjected.id)
        }
        else setSelectedLayer(null)
    }

    const selectLayerInCanvas = (layerId:any) => {
        const object = canvas.getObjects().find((obj:any) => obj.id === layerId)
        if(object) {
            canvas.setActiveObject(object)
            canvas.renderAll()
        }
    }


    const updateLayer = () => {
        if(canvas) {
            canvas.updateZIndices()
            const objects = canvas
            .getObjects()
            // .filter(
            //     ({obj}:any) => 
            //         ! (
            //             obj.id.startsWith("vertical-") ||  obj.id.startsWith("horizontal-")
            //         )
            // )
            .map((obj:any) => ({
                id: obj.id ,
                zIndex: obj.zIndex,
                type: obj.type
            }))
            setLayers([...objects].reverse())
        }
    }
    useEffect(() => {
        if(canvas) {
            canvas.on("object:added", updateLayer)
            canvas.on("object:modified", updateLayer)
            canvas.on("object:removed", updateLayer)
            
            canvas.on("selection:created", handleObjectSelected)
            canvas.on("selection:updated", handleObjectSelected)
            canvas.on("selection:cleared",() =>  handleObjectSelected(null))
            updateLayer()
            return () => {
            canvas.off("object:added", updateLayer)
            canvas.off("object:modified", updateLayer)
            canvas.off("object:removed", updateLayer)
            
            canvas.off("selection:created", handleObjectSelected)
            canvas.off("selection:updated", handleObjectSelected)
            canvas.off("selection:cleared", () => setSelectedLayer(null))

            }
        }
    }, [canvas])

    return (
        <div className="border-2 border-black shadow h-1/2 p-2 rounded w-[15rem] mb-2">
            <ul>
                
                {layers.map((layer:any) => (
                    <li key = {layer.id} onClick={() => selectLayerInCanvas(layer.id)} className={layer.id === selectedLayer ?"bg-red" : ""}>
                        {layer.type} {layer.zIndex}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LayerList