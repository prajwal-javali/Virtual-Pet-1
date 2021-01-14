//Create variables here
var dog1, database, foodStock, food;
var dog1img, dog2img;

function preload()
{
  dog1img = loadImage("images/dogImg.png");
  dog2img = loadImage("images/dogImg1.png");

	//load images here
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  dog1 = createSprite(250, 300, 20, 20);
  dog1.addImage(dog1img);
  dog1.scale = 0.2;
  
}


function draw() {
  background(46, 139, 87); 
  
  if (keyWentDown(UP_ARROW)) {
    writeStock(food);
    dog1.addImage(dog2img);
  }

  drawSprites();
  //add styles here
  stroke("white");
  textSize(20);
  fill("white");
  text("Note: Press Up Arrow to feed the dog", 200, 20);
  text("Food Remaining: "+food, 200, 100);


}

function readStock(data) {
  food = data.val();

}

function writeStock(x) {
  if (x <= 0) {
    x = 0
  }
  else {
    x = x-1
  }
  database.ref('/').update({
    food:x
  })
}