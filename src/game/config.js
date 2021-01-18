const directions = {
    up: 0,
    down: 1,
    left: 2,
    right: 3,
};

const pixelSize=16;

const screenSizes = () => {
    var width=screen.width;
    var height=480;
    if (width < 1024){        
        width=320;
        height=400;
    }else if (width < 1280){
        
    }else{
        width=width/3;
    } 
         
   return {
        width:width,
        height:height,
        cols:width/pixelSize,        
        rows:height/pixelSize
   }
};

export {
    directions,
    screenSizes,
    pixelSize
}