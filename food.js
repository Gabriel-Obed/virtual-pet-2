class FOOD{
  constructor(){
    this.foodS;
    this.img = loadImage("Milk.png");
    this.lastFed;
  }
  getFoodStock(){
    this.foodS = database.ref('Food');
    this.foodS.on("value", function (data){
      foodStock = data.val();
    });
  }
  updateFoodStock(x){
    database.ref('/').update({
      Food: x
    })
  }
  deductFoodStock(x){
    database.ref('/').update({
      Food: x
    })
  }
  display(){
    var x=80, y=170;
    this.foodStock = database.ref('Food');
    this.foodStock.on("value", function (data){
      foodStock = data.val();
    });
    this.foodS = foodStock;
    
    if(this.foodS!=0){
      for(var i = 0; i<this.foodS; i++){
        if(i%10===0){
          x = 80;
          y=y+50;
        }
        image(this.img, x, y, 50, 50);
        x = x+30;
      }
    }
  }
}