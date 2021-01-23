import { directions} from "../config";
const { up, down, left, right } = directions;
import { pixelSize,screenSizes} from "../config";

export default class Snake {
    constructor(scene,x,y) {
        this.headPosition = new Phaser.Geom.Point(x, y);
        this.body = scene.add.group();
        this.head = this.body.create(x * pixelSize, y * pixelSize, 'body');
        this.head.setOrigin(0);
        this.alive = true;
        this.speed = 100;
        this.moveTime = 0;
        this.tail = new Phaser.Geom.Point(x, y);
        this.heading = right;
        this.direction = right;
    }
    moveFace(cursors){

        if (cursors.left.isDown){            
            return this.applyMoveFace(left,[up,down]);
        }
        if (cursors.right.isDown){            
            return this.applyMoveFace(right,[up,down]);
        }
        if (cursors.up.isDown){
            return this.applyMoveFace(up,[right,left]);
        }
        if (cursors.down.isDown){            
            return this.applyMoveFace(down,[right,left]);            
        }
    }

    moveFaceTouch(x,y){ 
        if(this.heading===up){            
            return this.validateTouchX(x);
        }
        if(this.heading===down){            
            return this.validateTouchX(x);
        }
        if(this.heading===left){            
            return this.validateTouchY(y); 
        }
        if(this.heading===right){            
            return this.validateTouchY(y);   
        }
    }

    validateTouchX(x){
        if(x<this.head.x){                
            this.heading=left;                
        }
        if(x>this.head.x){                
            this.heading=right;                
        }
    }
    validateTouchY(y){        
        if(y<this.head.y){              
            this.heading=up;                
        }
        if(y>this.head.y){                            
            this.heading=down;                
        }
    }

    update (time){
        if (time >= this.moveTime){
            return this.move(time);
        }
    }

    applyMoveFace(newDirection,arrayValidDirections){

        const index = arrayValidDirections.findIndex(item => this.direction === item);        
        if(index!=-1){                      
            this.heading = newDirection;
        }
    }

    move (time){
        /**
        * Based on the heading property (which is the direction the pgroup pressed)
        * we update the headPosition value accordingly.
        * 
        * The Math.wrap call allow the snake to wrap around the screen, so when
        * it goes off any of the sides it re-appears on the other.
        */
        switch (this.heading){
            case left:
                this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, screenSizes().cols);
                break;
            case right:
                this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, screenSizes().cols);
                break;
            case up:
                this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, screenSizes().rows);
                break;
            case down:
                this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, screenSizes().rows);
                break;
        }

        this.direction = this.heading;

        //  Update the body segments and place the last coordinate into this.tail
        Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * pixelSize, this.headPosition.y * pixelSize, 1, this.tail);

        var hitBody = Phaser.Actions.GetFirst(this.body.getChildren(), { x: this.head.x, y: this.head.y }, 1);

        if (hitBody){            
            this.alive = false;
            return false;
        }
        //Update the timer ready for the next movement
        this.moveTime = time + this.speed;
        return true;
    }

    grow (){
        var newPart = this.body.create(this.tail.x, this.tail.y, 'body');
        newPart.setOrigin(0);
    }       

    decrease(number){
        for (var i = 0; i < number; i++) {
            var lastItem = this.body.getChildren()[this.body.getChildren().length-1];        
            if(lastItem){
                this.body.remove(lastItem,true);
            }  
        }                     
    }
    updateGrid(grid){
        //  Remove all body pieces from valid positions list
        this.body.children.each(function (segment) {

            var bx = segment.x / pixelSize;
            var by = segment.y / pixelSize;            
            grid[by][bx] = false;            
        });

        return grid;
    }
    removeHead(){
        var firstItem = this.body.getChildren()[0];        
        if(firstItem){
            this.body.remove(firstItem,true);
        }  
    }  

}