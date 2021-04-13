var pet,petimg,petimg2;
var database,foodS;

var feed,add
var foodobject
var Feedtime
var Lastfeed

function preload()
{
  petimg = loadImage("images/dogImg.png");
  petimg2 = loadImage("images/dogImg1.png");
}
function setup() {
  database = firebase.database();
  
  createCanvas(800, 800);
  pet = createSprite(250,350,5,5);
  pet.addImage(petimg);
  pet.scale =0.25;
var foodstockref = database.ref("food");
 foodstockref.on("value",readStock);
 
 feed=createButton("feed The Dog")
 feed.position(200,400)
 feed.mousePressed(feedDog)

 addFood=createButton("add Food")
 addFood.position(400,400)
 addFood.mousePressed(addfood)

 foodobject=new Food();
}

function draw() {  
  background("green");
    
  foodobject.display()
  feedTime=database.ref('feedTime')
  feedTime.on("value",function(data){
    Lastfeed=data.val();

    
  })
  fill(0)
  textSize(17)
  if(Lastfeed>=12){
    text("last feed : "+Lastfeed%12+"pm",350,30)
  }
  else if(Lastfeed===0){
    text("last feed : "+"12am",350,30)
  }
  else{
    text("last feed : "+Lastfeed+"pm",350,30)
  }
  drawSprites();
  }


function readStock(data){
  foodS=data.val();
  foodobject.updateFoodStock(foodS);
}

function feedDog(){
  pet.addImage(petimg2)
  if(foodobject.getFoodStock()<=0){
    foodobject.updateFoodStock(foodobject.getFoodStock()*0)
  }
  else{
    foodobject.updateFoodStock(foodobject.getFoodStock()-1)
  }
  database.ref('/').update({
   food:foodobject.getFoodStock(),
   feedTime:hour() 
  })
}

function addfood(){
foodS++;
database.ref('/').update({
  food:foodS
})

}