class Lane extends Rectangle {

    /*   Obstacle[] obstacles;
       col;
       type; //type could be car, log,...*/

    constructor(index, type, n, len, spacing, speed) {

        super(0, index * grid, width, grid); //width will always be width of the window
        this.type = type;
        //   let obstacles = obstacle[n]; //n cars/logs/...
        this.obstacles = [];
        // float speed = random(-3,3);
        let offset = random(1, 200);
        if (speed > 0){
            this.direction = "toRight";
        }else if(speed < 0){
            this.direction = "toLeft";
        }else{
            this.direction = "still";
        }




        for (let i = 0; i < n; i++) {
            let img;
            if(this.type == CAR){
                //ensure you get vehicles going in the correct direction
                if(this.direction === "toRight") {
                    let r = floor(random(0,roadImagestoRight.length));
                    img = roadImagestoRight[r];
                }else if(this.direction === "toLeft") {
                    let r = floor(random(0,roadImagestoLeft.length));
                    img = roadImagestoLeft[r];
                }
            }else if(this.type === LOG) {
                if(this.direction === "toRight") {
                    let r = floor(random(0,oceanImagestoRight.length));
                    img = oceanImagestoRight[r];
                }else if(this.direction === "toLeft") {
                    let r = floor(random(0,oceanImagestoLeft.length));
                    img = oceanImagestoLeft[r];
                }
            } else {
                img = null;
            }
            this.obstacles[i] = new Obstacle(offset + spacing * i, index * grid, grid, grid, speed,type,img,this.direction);
        }



    }


    check(frog) {
        for (let car of this.obstacles) { //however many cars there are, show and update all of them
            if (this.type == CAR) {
                if (frog.intersects(car)) {
                    resetGame();
                    console.log("GAME OVER, LOSER!!!");
                }
            } else if (this.type == LOG) {
                let ok = false;     // check all logs to ensure not intersecting any of them
                for (let log of this.obstacles) { //however many logs there are, show and update all of them
                    // you only want to start thinking about the logs if your above the safety line
                    // the game is over if your not intersecting a log
                    if (frog.intersects(log)) {
                        frog.attach(log);
                        ok = true;
                    }
                }
                if (!ok) {
                    resetGame();
                }
            } else if (this.type == SAFETY) {

            }else{ //else this.type == FINISH

            }
        }

    }

    run() {
        //fill the lane
        //todo: I'm going to fill the lane with a random obstacle car,skater,basketball player (start w/ biker)
        if(this.type === CAR) {
            image(roadImage, this.x, this.y, width, 50);
        }else if(this.type === LOG){
            fill('#319fbc');
            rect(this.x, this.y, this.w, this.h);
            image(oceanImage,this.x,this.y,width,50);

        }else if(this.type === SAFETY) {
            rect(this.x, this.y, this.w, this.h);
            image(grassImage,this.x,this.y,width,50);
        }else{
            fill('light green');
            rect(this.x, this.y, this.w, this.h);
             image(finishLine, this.x, this.y, width, 60);
        }
        //fill lane with obstacles
        for (let o of this.obstacles) {
            o.show();
            o.update();
        }
    }



}