class Frog extends Rectangle {

    // attachedObstacle = null; //if you go onto a log, you should move with the log

    constructor(x, y, w) {
        super(x, y, w, w);
        this.attachedObstacle = null;
        this.dragging = false;
        this.rollover = false;
        this.offsetX = 0;
        this.offsetY = 0;
    }

//display the frog
    show() {
        //fill(200);
       // rect(this.x, this.y, this.w, this.w);
        image(frogImage,this.x, this.y, this.w, this.w);
    }

    move(xdir, ydir) {
        this.x += xdir * grid;
        this.y += ydir * grid;
        this.attach(null); //every time you move you detach
    }

    attach(log) {
        this.attachedObstacle = log;
    }

    update() {
        //if the frog is attached to a log, then it will move with the log
        if (this.attachedObstacle != null) {
            frog.x += this.attachedObstacle.speed;
        }
        //the frog cannot leave the window, it will just be pushed against it
        frog.x = constrain(this.x, 0, width - this.w);
    }
/*    //adjusts frog location to where mouse (or finger) is over, else rollover will be set to false
    adjustLocation(){
        console.log("adjustLocations() is being called");
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y) {
            this.rollover = true;
        }
        else {
            this.rollover = false;
        }
        // Adjust location if being dragged
        if (this.dragging) {
          //  this.move(this.x,this.y);
            this.x = (Math.round(mouseX  / 50)*50) ;
            this.y = (Math.round(mouseY  / 50)*50);
        }
    }
    mousePressed() {
        console.log("mousePressed() is being called");
        console.log(mouseX);
        console.log(mouseY);
        // Did I click on the rectangle?
        if ((mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y)) {
            this.dragging = true;
            // If so, keep track of relative location of click to corner of rectangle
       //     this.offsetX = this.x-mouseX;
        //    this.offsetY = this.y-mouseY;
        }
    }
    mouseReleased() {
        console.log("mouseReleased() is being called");

        // Quit dragging
        this.dragging = false;
    }
    */


}