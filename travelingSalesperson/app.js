let points = [];
let totalPoints = 3;


function setup() {
    let canvas = createCanvas(400, 300);
    canvas.parent('travelingSalesperson-holder');
    for (let i = 0; i < totalPoints; i++) {
        let v = createVector(random(width)-1, random(height)-1);
        points[i] = v;

    }
}
function draw(){
        background(0);
    // draw the points/verteces
        fill(255);
    for(let i = 0; i<points.length;i++){
        ellipse(points[i].x,points[i].y,16,16); //draw a circle representing that city
    }
    // draw the edges
    stroke(255);
    strokeWeight(2);
    noFill();
    beginShape();
    for(let i = 0; i<points.length;i++){
        vertex(points[i].x,points[i].y);
    }
    endShape();
}
