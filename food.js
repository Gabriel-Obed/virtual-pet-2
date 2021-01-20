class FOOD{
  constructor(){
    this.foodStock = 0;
    this.img = loadImage("Milk.png");
    this.lastFed;
  }
  getFoodStock(){
    return this.foodStock;
  }
  updateFoodStock(foodStock){
    this.foodStock = foodStock; 
  }
  deductFoodStock(){
    if(this.foodStock>0){
      this.foodStock = this.foodStock-1;
    }
  }
  getFedTime(lastFed){
    this.lastFed = lastFed;
  }
  display(){
    background(46, 139, 87)
    fill(225, 225, 254);
    textSize(15);
    
    if(this.lastFed>=12){
      text( "last fed : "+this.lastFed%12+" PM", 50, 30);
    }
    else if(this.lastFed === 0){
      text("last fed : 12 AM", 50, 30);
    }
    else{
      text("last fed : "+this.lastFed+"AM", 50,30);
    }
    var x = 20, y = 100;
    
    
    imageMode(CENTER);

    if(this.foodStock!=0){
      for(var i = 0; i<this.foodStock; i++){
        if(i%10 === 0){
          x = 80;
          y = y+50;
        }
        image(this.img, x, y, 50, 50);
        x = x+30;
      }
    }
}
}