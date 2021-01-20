//Create variables here
var  dog, happyDog, database, foodS=0, foodStock, dogSprite;
var database, foodObj, add_foodButton, feed_DogButton, nameInput;
var lastFeed, feedTime;
var gameState, readState;

function preload(){
  //load images here
  dog = loadImage("dogImg.png");
  happyDog=loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(800, 500);

  foodObj = new FOOD();

  foodStock = database.ref('Food');
  foodStock.on("value", function (data){
    lastFed = data.val();
  })
  readState = database.ref('gameState');
  readState.on("value", function (data){
    gameState = data.val();
  })
  
  dogSprite = createSprite(700, 250, 40, 40);
  dogSprite.addImage("a", dog);
  dogSprite.scale = 0.25

  feed_DogButton = createButton("feed the dog");
  feed_DogButton.position(600, 40);
  feed_DogButton.mousePressed(feed_Dog);

  add_foodButton = createButton("add food");
  add_foodButton.position(700, 40);
  add_foodButton.mousePressed(add_food)

}
function draw() {  
  currentTime = hour();

  foodObj.display();
  
  
  drawSprites();
}

function writeStock(x){
  if(x <= 0){
    x = 0
  }
  else{
    x = x-1
  }
  database.ref('/').update({Food: x})
}
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}
function add_food(){
  foodObj.foodStock++;
  database.ref('/').update({
    Food: foodS
  })
}
function feed_Dog(){
  foodS = foodS-1;
  if(foodS <= 0){
    foodS = 0
  }
  foodObj.getFedTime(hour())
  dogSprite.addImage("a", happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);

  database.ref('/').update({
    Food: foodObj.getFoodStock(), 
    lastFedTime: hour(), 

  })
}
function update(state){
  database.ref.update({
    gameState: state
  })
}