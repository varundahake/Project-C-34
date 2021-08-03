var dogImg,happyDogImg,washroom, database;
var foodS,foodStock;


function preload(){

happyDogImg=loadImage("images/happy dog.png");
dogImg = loadImage("images/Dog.png");
}

function setup() {
  createCanvas(400,500);
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(20);
   
  dog=createSprite(200,400,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;
  
}

function draw() {
  background("green");
  if(foodS !== undefined){
    textSize(20);
    fill(255);
    text("Press UP_ARROW key to feed Drago Milk", 50, 50);
    text("Food remaining: " +foodS, 150, 150);
  }

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
  }

  if(foodS === 0){
    foodS === 20;
  }
 
  drawSprites();
}


function writeStock(x){
if(x <=0){
  x = 0;
}
else{
  x = x-1;
}
database.ref("/").update({
  Food:x
});
}

function readStock(data){
  foodS = data.val();


}