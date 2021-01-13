//Create variables here
var  dog, happyDog, database, foodS, foodStock, dogSprite;
var database, foodObj, add_foodButton, feed_DogButton, nameInput;
var lastFeed, feedTime;

function preload(){
  //load images here
  dog = loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(800, 500);

  database = firebase.database();

  database.ref('/').update({Food: 20})
  
  dogSprite = createSprite(700, 250, 40, 40);
  dogSprite.addImage("a", dog);
  dogSprite.scale = 0.25

   nameInput = createInput("Name");
   nameInput.position(150, 30);

   done = createButton('DONE');
   done.position(210, 70);

   done.mousePressed(function(){
    nameInput.hide();
    done.hide();

    var name = nameInput.value();
    
    var text = createElement('h3');
    text.html("Press feed dog button to feed " + name + " milk")
    text.position(130, 50) });

    foodObj = new FOOD();

    
}
function draw() {  

  background("green")

  foodStock = database.ref('Food');
  foodStock.on("value", function (data){
    foodS = data.val();
  });
  add_foodButton = createButton("add food");
  add_foodButton.position(600, 50);
  if(nameInput.value() != "Name"){
    add_foodButton.mousePressed(add_food);
  }
  feed_DogButton = createButton("feed the dog");
  feed_DogButton.position(500, 50);
  if(nameInput.value() != "Name"){
    feed_DogButton.mousePressed(feed_Dog);
  }
  foodObj.display();
  
  
  drawSprites();
  //add styles here
  fill("blue");
  textSize(15);
  text("Food remaining: "+foodS, 180, 170);
  if(lastFeed>=12){ 
    text("Last Feed : "+ lastFeed%12 + " PM", 150,130);
 }
  else if(lastFeed==0){ 
    text("Last Feed : 12 AM",50,30);
   }
   else{ 
     text("Last Feed : "+ lastFeed + " AM", 150,130);
     }
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
function add_food(){
  foodS++
  database.ref('/').update({
    Food: foodS
  })
}
function feed_Dog(){
  foodS = foodS-1;
  if(foodS <= 0){
    foodS = 0
  }
  dogSprite.addImage("a", happyDog);
  foodObj.deductFoodStock(foodS);
  foodObj.updateFoodStock(foodS);
  database.ref('/').update({
    lastFedTime: hour()
  })
  feedTime = database.ref('lastFedTime')
  feedTime.on("value", function (data){
    lastFeed = data.val();
  })
}