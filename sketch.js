var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed,feedTime;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  feedTime=database.ref("FeedTime");
  feedTime.on("value",function(time){
    lastFed=time.val();
  })

  
 
  //write code to display text lastFed time here

 
  drawSprites();
  strokeWeight(10);
  textSize(15);
  
  fill ("white");
  
  if(lastFed>=12){
    text("Last Feed : "+lastFed+" PM",350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",500,95);
  }else if(lastFed<12){
    text("Last Feed : "+lastFed+" AM",500,95);
  }
  //console.log(lastFed);
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  foodS=foodS-1;
  database.ref("/").update({
    Food: foodS
  })
  lastFed=hour();
  lastFed=lastFed+1;
  database.ref("/").update({
    FeedTime: lastFed
  })
  console.log(lastFed)

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

