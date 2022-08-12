import React, { useState, useRef, useEffect } from 'react';
import { fabric } from 'fabric';
import './Canvas.css'
import Header from '../Header/Header';
import brush from '../svg/brush.svg'
import rect from '../svg/rect.svg'
import circ from '../svg/circ.svg'
import ntext from '../svg/text.svg'
import textbold from '../svg/text-bold.svg'
import yesgroup from '../svg/group.svg'
import ungroup from '../svg/ungroup.svg'
import singledelete from '../svg/delete.svg'
import clearcanvas from '../svg/clear-canvas.svg'
// import UseAuth from '../firebase/AuthProvider/UseAuth';


const CanvasComponent = () => {
  const canvasRef = useRef();
  const fabricRef = useRef();
  const [canvas, setCanvas] = useState();
  const [text, setText] = useState('');
  // const { logout, user } = UseAuth();

  
 
  const textInput = (e) =>{
    setText(e.target.value);
    
  }
  // const rangevalue = (e) =>{
  //   range = e.target.value;
  //   console.log(range);
  //   canvas.freeDrawingBrush.width = range;
  //   canvas.requestRenderAll();

  // }
  const colorvalue = (e) =>{
    color = e.target.value;
    canvas.freeDrawingBrush.color = color;
    canvas.requestRenderAll();
  }

  const clearCanvas = (canvas) => {
    canvas.getObjects().forEach((o) => {
        if(o !== canvas.backgroundImage){
            canvas.remove(o)
        }
    })   
}

  const deleteOne = (canvas) => {
    canvas.getActiveObjects().forEach((obj) => {
      canvas.remove(obj)
    });
    canvas.discardActiveObject().requestRenderAll()   
}


const addText = () => {
  var atext = new fabric.Text(text, {
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'Arial',
    fill: color
    // shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
  });
  canvas.add(atext);
  canvas.requestRenderAll();
  
}
const addTextbold = () => {
  var atext = new fabric.Text(text, {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    fill: color
    // shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
  });
  canvas.add(atext);
  canvas.requestRenderAll();
  
}

const reader = new FileReader()

const imgInput = (e) =>{
  const file = e.target.files[0];
  reader.readAsDataURL(file)
  
}

reader.addEventListener('load', () => {
fabric.Image.fromURL(reader.result, img => {
      canvas.add(img)
      canvas.requestRenderAll();
  })
})
 




const group = {}; 
let color = '#00000'
let range = 20;
let currentMode;
const modes = {
    pan: 'pan',
    drawing: 'drawing'
}
let mousePress = false;
//  togglePan button 

const toggleMode = (mode) => {
    if( mode === modes.pan ){
        if(currentMode === modes.pan ){
            currentMode = '';
        } else {
            currentMode = modes.pan
            canvas.isDrawingMode = false;
            canvas.requestRenderAll();
        }
    } else if ( mode === modes.drawing ){
        if(currentMode === modes.drawing ){
            currentMode = '';
            canvas.isDrawingMode = false;
            canvas.requestRenderAll();
        } else {
            canvas.freeDrawingBrush.color = color;
            canvas.freeDrawingBrush.width = range;
    
            currentMode = modes.drawing
            canvas.isDrawingMode = true;
            canvas.requestRenderAll();
        }
    }
    console.log(mode);
}


  const setPanEvents = (canvas) => {
    canvas.on('mouse:move', (event) => {
        // console.log(event);
        if(mousePress && currentMode === modes.pan){
            canvas.setCursor('grab')
            canvas.requestRenderAll();
            const mEvent = event.e;
            const delta = new fabric.Point(mEvent.movementX, mEvent.movementY)
            canvas.relativePan(delta);
            console.log('i am not working');
        }
    })
    
    canvas.on('mouse:down', (event) => {
        mousePress = false;
        if(currentMode === modes.pan){
            canvas.setCursor('grab')
            canvas.requestRenderAll();
        }
    })
    canvas.on('mouse:up', (event) => {
        mousePress = false;
        canvas.setCursor('grab')
        canvas.requestRenderAll();
    })
    
}

const groupObjects = (canvas, group, shallGroup) => {
  if(shallGroup) {
      const objects = canvas.getObjects()
      group.val = new fabric.Group(objects)
      clearCanvas(canvas)
      canvas.add(group.val)
      canvas.requestRenderAll()
  } else {
      group.val.destroy()
      const oldGroup = group.val.getObjects()
      canvas.remove(group.val)
      canvas.add(...oldGroup)
      group.vall = null
      canvas.requestRenderAll()

  }
}




const createRect = (canvas) => {
  const canvCenter = canvas.getCenter();
  const rect = new fabric.Rect({
      width: 100,
      height: 100,
      fill: color,
      left: canvCenter.top,
      top: canvCenter.left,
      originX: 'center',
      originY: 'center',
  })
  canvas.add(rect)
  canvas.requestRenderAll();
}
const createCirc = (canvas) => {
  const canvCenter = canvas.getCenter();
  const circ = new fabric.Circle({
      radius: 50,
      fill: color,
      left: canvCenter.top,
      top: canvCenter.left,
      originX: 'center',
      originY: 'center',
  })
  canvas.add(circ)
  canvas.requestRenderAll();
  
}
  

  // INIT
  useEffect(() => {
    if (!canvasRef.current) return;
    if (fabricRef.current) return;
    const canvas = new fabric.Canvas('canvas', {
      width: 800,
      height: 500,
      backgroundColor: 'white',
    });
    fabricRef.current = canvas;
    setPanEvents(canvas)
    setCanvas(canvas)
  });
 
  
  return (
    <div>
      <Header />
      <div className='container'>
          <div className='all-controls'>
              <div className='input-div'>
                {/* <input type='range' min="0" max="100"  onChange={rangevalue} ></input> */}
                <input title='Color Input' type='color' value="#0000" onChange={colorvalue} ></input>
                <div  title='Upload Image' className='img-parent'><input className='img-input' type="file" accept="image/*" onChange={imgInput} ></input></div>
                <input title='Text Input' className='text-input' placeholder='Enter Text' type="text" onChange={textInput} ></input>
              </div>
              
              <div>
                <img title='Brush tool' className='common-btn' onClick={() => toggleMode(modes.drawing)} src={brush} alt=""></img>
                <img title='Create Rectengle' className='common-btn-nb' onClick={ () => createRect(canvas)} src={circ} alt=""></img>
                <img title='Create Cercle' className='common-btn-nb' onClick={() => createCirc(canvas)} src={rect} alt=""></img>
                
                <img title='Add Normal Text' className='common-btn-nb' onClick={() => addText()} src={ntext} alt=""></img>
                <img title='Add Bold Text' className='common-btn' onClick={() => addTextbold()} src={textbold} alt=""></img>
              </div>
        
              <div className='group-btn'>

              <img title='Groupe All Object' className='common-btn-nb' onClick={() => groupObjects(canvas, group, true)} src={yesgroup} alt=""></img>
              <img title='Ungroup All Objects' className='common-btn-nb' onClick={() => groupObjects(canvas, group, false)} src={ungroup} alt=""></img>
        
              <img title='Clear Full Canvas' className='common-btn-nb' onClick={() => clearCanvas(canvas)} src={clearcanvas} alt=""></img>
              <img title='Delete One Object' className='common-btn-nb' onClick={() => deleteOne(canvas)} src={singledelete} alt=""></img>
              
              </div>
          </div>  
          <div>
              <canvas id="canvas" ref={canvasRef}  />
              
          </div> 
      </div>
    </div>
  );
};

export default CanvasComponent;