
export default class Food extends Phaser.GameObjects.Image {
    //constructor(scene ,type,validLocation) {   
    constructor(scene,type,validLocation){
        if(validLocation){
            super(scene, validLocation.x, validLocation.y, type, 0);         
            this.setOrigin(0);
            scene.children.add(this);        
        }      
    }
    eat(sound){        
        
        sound.play('thud', { volume: 0.75 }); 
    }
}