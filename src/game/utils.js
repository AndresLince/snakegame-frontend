import { pixelSize,screenSizes} from "./config";

const getValidLocations = (snake,arrayGrid,arrayItems)=>{    

    //  A Grid we'll use to reposition the food each time it's eaten
    const clone = items => items.map(item => (Array.isArray(item) ? clone(item) : item))
    var testGrid = clone(arrayGrid);    

    snake.updateGrid(testGrid);    
    arrayItems.forEach(function (items) {        
        items.forEach(function (segment) {
            var bx = segment.x / pixelSize;
            var by = segment.y / pixelSize;             
            testGrid[by][bx] = false;
        });        
    });      

    //  Purge out false positions
    var validLocations = [];

    for (var y = 0; y < screenSizes().rows; y++){        
        for (var x = 0; x < screenSizes().cols; x++){           
            if (testGrid[y][x] === true){
                //  Is this position valid for food? If so, add it here ...
                validLocations.push({ x: x*pixelSize, y: y*pixelSize });
            }
        }
    }
    return validLocations;
}
// create an array with all positions of the grid    
const getArrayGrid = () =>{  
    var testGrid = [];
    for (var y = 0; y < screenSizes().rows; y++){
        testGrid[y] = [];        
        for (var x = 0; x < screenSizes().cols; x++){
            testGrid[y][x] = true;
        }
    }
    return testGrid;
}


const collided = (arrayObstacles,snake,deleteItem) =>{                 

    const index = arrayObstacles.findIndex(segment => snake.head.x === segment.x && snake.head.y === segment.y);        
    if(index!=-1){          
        if(deleteItem){
            arrayObstacles[index].destroy();
            arrayObstacles.splice(index, 1);
        }     
        if(!deleteItem){
            snake
        }    
        return true;
    }
    return false;       
}  

const selectValidLocation=(snake,arrayGrid,arrayItems)=>{
    var validLocations = getValidLocations(snake,arrayGrid,arrayItems);
    
    return Phaser.Math.RND.pick(validLocations);    
}

export {
    getValidLocations,
    getArrayGrid,
    collided,
    selectValidLocation
}

