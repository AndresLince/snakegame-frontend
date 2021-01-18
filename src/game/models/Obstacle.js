
export default class Obstacle extends Phaser.GameObjects.Image {
    
    constructor(scene,validLocation) {           
        if(validLocation){
            super(scene, validLocation.x, validLocation.y, 'rock', 0);         
            this.setOrigin(0);
            scene.children.add(this);      
        }              
    }   
}