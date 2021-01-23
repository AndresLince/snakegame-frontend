import { Scene } from 'phaser'
import green_apple from '@/assets/green_apple.png'
import red_apple from '@/assets/red_apple.png'
import body from '@/assets/snake_body.png'
import rockImage from '@/assets/spike.png'
import flame from '@/assets/flame.png'
import Snake from '../models/Snake.js'
import Food from '../models/Food.js'
import bite_apple from '@/assets/sounds/bite_apple.mp3'
import crash from '@/assets/sounds/crash.mp3'
import backgroundsound from '@/assets/sounds/backgroundsound.mp3'
import { getArrayGrid,collided,selectValidLocation} from "../utils"
import Obstacle from '../models/Obstacle.js'

var snake;
var cursors;
var food;
var arrayGreenApples=[];
var obstacle;
var arrayGrid=[];
var arrayObstacles=[];
var redApple;
var arrayRedApples=[];
var scene;
var total;
var greenAppleCounter;
var backGroundMusic;

class ClaseEventEmitter extends Phaser.Events.EventEmitter{};

export const changeEmitter = new ClaseEventEmitter();

export default class PlayScene extends Scene { 
  
  constructor () {
    super({ key: 'PlayScene' })
  }  

  preload(){
    this.load.image('green_apple', green_apple);
    this.load.image('red_apple', red_apple);
    this.load.image('body', body);
    this.load.image('flame', flame);
    this.load.image('rock', rockImage);
    this.load.audio('bite_apple', bite_apple)
    this.load.audio('crash', crash)
    this.load.audio('backgroundsound',backgroundsound)
  }  

  create () {      
    this.setBackGroundMusic();
    scene=this.scene; 
    total=0;
    greenAppleCounter=0;
    arrayObstacles=[];
    arrayGreenApples=[];
    arrayRedApples=[];
    arrayGrid = getArrayGrid();
    snake = new Snake(this, 8, 8);
    this.createGreenApples(1);  
    //  Create our keyboard controls
    cursors = this.input.keyboard.createCursorKeys();

    changeEmitter.on('restartGame', this.restartGame);

    this.scene.scene.input.on('pointerdown', function (pointer) {

      var touchX = pointer.x;
      var touchY = pointer.y;      
      snake.moveFaceTouch(touchX,touchY);
    });
  }

  setBackGroundMusic(){
    backGroundMusic = this.sound.add('backgroundsound');
    backGroundMusic.setLoop(true);
    backGroundMusic.play({ volume: 0.2 });
  }

  restartGame(){    
    scene.restart();
  }

  update (time, delta) {
    
    if (!snake.alive){
      backGroundMusic.stop();
      changeEmitter.emit('finishedGame');        
      this.scene.pause();
      return;
    }

    /**
    * Check which key is pressed, and then change the direction the snake
    * is heading based on that. The checks ensure you don't double-back
    * on yourself, for example if you're moving to the right and you press
    * the LEFT cursor, it ignores it, because the only valid directions you
    * can move in at that time is up and down.
    */
    
    snake.moveFace(cursors);

    if (snake.update(time)){
        //  If the snake updated, we need to check for collision against food

        if (collided(arrayGreenApples,snake,true)){          
          this.collideWithGreenApple();
          return;
        }     

        if (collided(arrayObstacles,snake,false)){    
          this.collideWithObstacle();
          return;
        }

        if (collided(arrayRedApples,snake,true)){
              
         this.collideWithRedApple();
          return;
        }

        this.validateCreateRedApple();
        
    }
  }   
  createGreenApples(number){
    for(var i=0;i<number;i++){
      food = new Food(this, 'green_apple',selectValidLocation(snake,arrayGrid,[arrayRedApples,arrayGreenApples,arrayObstacles]));
      arrayGreenApples.push(food);
    }    
  }
  validateCreateRedApple(){
    var pos = Phaser.Math.Between(0, 100);
    if(pos==1){
      
      redApple = new Food(this, 'red_apple',selectValidLocation(snake,arrayGrid,[arrayRedApples,arrayGreenApples,arrayObstacles]));   
      arrayRedApples.push(redApple);        
    }
  }
  createObstacle(numberOfObstacles){

    for(var i=0;i<numberOfObstacles;i++){
      obstacle = new Obstacle(this,selectValidLocation(snake,arrayGrid,[arrayRedApples,arrayGreenApples,arrayObstacles]));
      arrayObstacles.push(obstacle);    
    }     
  }
  collideWithObstacle(){
    console.log("choca con obstaculo")       
    this.sound.play('crash', { volume: 0.75 });       
    snake.removeHead();     
    snake.alive=false;
  }

  collideWithRedApple(){
    console.log("choca con manzana roja")      
    this.sound.play('bite_apple', { volume: 0.75 }); 
    total=total-2;      
    if(total<0){
      total=0;
      snake.alive=false;
    }        
    changeEmitter.emit('changeScore', total); 
    snake.decrease(2); 
  }
  collideWithGreenApple(){
    snake.grow();          
    total++;
    greenAppleCounter++;          
    this.createGreenApples(1);
    this.sound.play('bite_apple', { volume: 0.75 }); 
    if(greenAppleCounter % 10 === 0){

        var pos = Phaser.Math.Between(0, 1);
        if(pos==1){
          arrayObstacles.forEach(element=>{                
            element.setTexture('flame');
          })
        }

        if(pos==0||arrayObstacles.length==0){
          this.createObstacle(10);
        }
    }
    changeEmitter.emit('changeScore', total); 
  }
}
