var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var jungle
var score = 0;
var enemyCount = 0;
var hi = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

  jungleImage = loadImage("jungle.jpg");

}



function setup() {
  createCanvas(500, 500);
   var score = 0;
  jungle = createSprite(200, 200, 200, 200);
 jungle.addImage(jungleImage);
 jungle.velocityX = -4;
 jungle.x = camera.x;
  monkey = createSprite(50, 400);
  monkey.scale = 0.2;
  monkey.addAnimation("monkey animation", monkey_running)

  invisibleGround = createSprite(250, 460, 500, 25);
  invisibleGround.visible = false;

  obstacleGroup = new Group();

  bananaGroup = new Group();

 


}


function draw() {

  if (jungle.x < 0) {
    jungle.x = 300;
}

  if (monkey.isTouching(obstacleGroup)){
    obstacleGroup.destroyEach()
    monkey.scale = monkey.scale - 0.1;
    score = score - 1;
  }
  
  console.log(enemyCount)

  if (monkey.scale ===0) {
    jungle.velocityX = 0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }

  bananaSpawn();

  obstacleSpawn();
  
    if (monkey.isTouching(bananaGroup)){
    score = score+1;
    switch(score){
      case 10: monkey.scale = 0.12;
        break;
      case 20 : monkey.scale = 0.14;
        break;
        case 30 : monkey.scale = 0.16;
        break;
        case 40 : monkey.scale = 0.18;
        break;
        case 50 : monkey.scale = 0.20;
        break;
        default : break;
    }
      bananaGroup.destroyEach();
  }

  if (keyDown("space")) {
    monkey.velocityY = -18;
  }
  


  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(invisibleGround);
  
  if (hi<score){
    hi = score;
  }



  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("score : " + score, 400, 50)
  
  stroke("white");
  textSize(20);
  fill("white");
  text("High Score : " + hi, 250, 50)

}

function bananaSpawn() {
  if (frameCount % 60 === 0) {
    banana = createSprite(500, Math.round(random(150, 250)))
    banana.scale = 0.1;
    banana.addImage(bananaImage);
    banana.velocityX = -4;
    banana.lifetime = 500;
    bananaGroup.add(banana);
  }
}

function obstacleSpawn() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(500, 390)
    obstacle.scale = 0.3;
    obstacle.addImage(obstaceImage);
    obstacle.velocityX = -4;
    obstacle.lifetime = 500;
    obstacleGroup.add(obstacle);
  }
}