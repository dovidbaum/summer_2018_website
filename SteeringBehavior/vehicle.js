function Vehicle(x,y){
    this.pos    = createVector(random(width),random(height));
    this.target = createVector(x,y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.radius = 4;
    this.maxSpeed = 10;
    this.maxForce = 1;
}

Vehicle.prototype.behaviors = function(){
    let arrive = this.arrive(this.target);
    let mouse = createVector(pmouseX,pmouseY);
    let flee = this.flee(mouse);
    arrive.mult(.5);        //flees faster than it arrives
    flee.mult(2.5);
    this.applyForce(arrive);
    this.applyForce(flee);

}

Vehicle.prototype.applyForce = function(f){
    this.acc.add(f);
}

Vehicle.prototype.arrive = function(target){
    let desired = p5.Vector.sub(target,this.pos);  //vector that point from position to target
    let distance = desired.mag();
    let speed;
    if(distance < 80){
        speed = map(distance,0,100,0,this.maxSpeed);
    }else{
        speed = this.maxSpeed;
    }
    desired.setMag(speed);
    let steer = p5.Vector.sub(desired,this.vel);
    steer.limit(this.maxForce);
    return steer;
}


Vehicle.prototype.flee = function(target){
    let desired = p5.Vector.sub(target,this.pos);  //vector that point from position to target
    let distance = desired.mag();
    if(distance < 40) {   //arbitrarilly how 'afraid' points are of mouse
        desired.setMag(this.maxSpeed);
        desired.mult(-1);
        let steer = p5.Vector.sub(desired,this.vel);
        steer.limit(this.maxForce);
        return steer;
    }else{
        return createVector(0,0);
    }


}

Vehicle.prototype.update = function(){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0); //each acceleration starts at 0
}

Vehicle.prototype.show = function(){
    stroke(255);
    strokeWeight(8);
    point(this.pos.x,this.pos.y);


}