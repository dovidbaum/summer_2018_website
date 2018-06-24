class Obstacle extends Rectangle{
  //  speed;


    constructor(x, y, w, h, speed,type,img,direction){
    super(x,y,w,h);
    this.type = type;
    this.speed = speed;
    this.img = img;
    this.direction = direction;

}
update(){
    this.x = this.x+this.speed;
    //when the car goes offscreen, I want it to re-enter
    // if moving to the right check if off that edge
    if (this.direction === "toRight" && this.x > width+grid){
        this.x = -this.w-grid;
    }else if(this.direction === "toLeft" && this.x < -this.w-grid){ //else they are moving to the left
        this.x = width+grid;
    }
}

//display the car
show(){
        image(this.img, this.x, this.y, this.w, this.w);
}
}