class Frog extends Rectangle {

    // attachedObstacle = null; //if you go onto a log, you should move with the log

    constructor(x, y, w) {
        super(x, y, w, w);
        this.attachedObstacle = null;
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


}