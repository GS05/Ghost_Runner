var gameState="play";
var tower, tower_Image;
var ghost, ghost_Image;
var climber_Image, climberGroup, door_Image;
var ground, sound;


function preload(){
  tower_Image=loadImage("tower.png");
  ghost_Image=loadImage("ghost-standing.png");
  door_Image=loadImage("door.png");
  climber_Image=loadImage("climber.png");
  sound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  tower=createSprite(300,300,10,10);
  tower.addImage(tower_Image);
  tower.velocityY=10;
  
  ground=createSprite(300,500,600,10);
  ground.visible=false;
  
  sound.play();
  
  ghost=createSprite(300,300,10,10);
  ghost.addImage(ghost_Image);
  ghost.scale=0.35;
  
  climberGroup=new Group();

}

function draw(){
  background(180);
  
  if(gameState==="play"){
    
  
  if(tower.y>400){
    tower.y=tower.width/2;
  }
  if(keyDown("left_arrow")){
     ghost.x=ghost.x-3;
     }
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY=-20;
  }
  ghost.velocityY=ghost.velocityY+0.8;
    ghost.collide(ground);
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;

    gameState="end";
    ghost.destroy();
  }
  doors();
  }
  if(gameState==="end"){
  textSize(20);
  text("GAME OVER",300,300)
}
  drawSprites();
}

function doors(){
  if(frameCount%125===0){
  door=createSprite(200,-50,10,10);
  door.addImage(door_Image);
  door.x=Math.round(random(100,500))
  door.velocityY=10;
  door.depth=ghost.depth;
  ghost.depth=ghost.depth+1;
  door.scale=0.8;
  door.lifetime=60;
  
  climber=createSprite(200,-3,10,10);
  climber.addImage(climber_Image);
  climber.x=door.x;
  climber.velocityY=10;
  climber.scale=0.8;
  ghost.depth=climber.depth;
  climber.depth=climber.depth+1;
  climber.lifetime=60;
  climberGroup.add(climber);
    
  invisibleBlock=createSprite(200,-3,60,10);
  invisibleBlock.x=climber.x;
  invisibleBlock.velocityY=10;
  invisibleBlock.debug=true;
  }
}
