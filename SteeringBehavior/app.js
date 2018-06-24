let font;
let fontSize = 150;
let line1 = [];
let line2 = [];
let line3 = [];
let line4 = [];
let line5 = [];
let line6 = [];
let line7 = [];
let line8 = [];


//todo: figure out how to realighn text size: https://creative-coding.decontextualize.com/text-and-type/

function preload() {
    font = loadFont('font/roboto/Roboto-Bold.ttf');

}


function setup(){
    let canvas = createCanvas(100,900); // customize this so it fits screen nicely
    canvas.parent('text-holder')
    clear()  //uncomment this to make background clear
 //  background(255);

    showText();
   // welcome();

}

function draw(){
    clear() //uncomment this to make background clear
 //   background(51);

    for(let i=0; i<line1.length;i++) {
        let v = line1[i];
        v.behaviors();
        v.update();
        v.show();
    }
    for(let i=0; i<line2.length;i++) {
        let v = line2[i];
        v.behaviors();
        v.update();
        v.show();
    }
    for(let i=0; i<line3.length;i++) {
        let v = line3[i];
        v.behaviors();
        v.update();
        v.show();
    }



}

function showText(){
    let pt;
    let vehicle;
    // converts font into an object and converts font to points.
    //(txt, x, y, fontSize, options)
    let points1 = font.textToPoints("w" ,0,200,fontSize);
    for(let i=0; i<points1.length;i++) {
        pt = points1[i];
        vehicle = new Vehicle(pt.x, pt.y);
        line1.push(vehicle);
    }

    // converts font into an object and converts font to points.
   let points2 = font.textToPoints("e" ,0,300,fontSize);
    for(let i=0; i<points2.length;i++) {
        pt = points2[i];
        vehicle = new Vehicle(pt.x, pt.y);
        line2.push(vehicle);
    }
    let points3 = font.textToPoints("l" ,20,450,fontSize);
    for(let i=0; i<points3.length;i++) {
        pt = points3[i];
        vehicle = new Vehicle(pt.x, pt.y);
        line3.push(vehicle);
    }


}


function windowResized() {
    resizeCanvas(windowWidth/2, windowHeight/2);
}

/*
window.onresize = function() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    p5.canvas.size(w,h);
    width = w;
    height = h;
};
*/


