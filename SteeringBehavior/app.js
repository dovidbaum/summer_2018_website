let font;
let fontSize = 120;
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
    canvas.parent('text-holder'); //this attaches the canvas to a parent div
    clear()  //uncomment this to make background clear
  // background(255);

    showText();
   // welcome();

}

function draw(){
    clear() //uncomment this to make background clear
  //  background(51);

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
    for(let i=0; i<line4.length;i++) {
        let v = line4[i];
        v.behaviors();
        v.update();
        v.show();
    }
    for(let i=0; i<line5.length;i++) {
        let v = line5[i];
        v.behaviors();
        v.update();
        v.show();
    }
    for(let i=0; i<line6.length;i++) {
        let v = line6[i];
        v.behaviors();
        v.update();
        v.show();
    }
    for(let i=0; i<line7.length;i++) {
        let v = line7[i];
        v.behaviors();
        v.update();
        v.show();
    }
    for(let i=0; i<line8.length;i++) {
        let v = line8[i];
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
    let points1 = font.textToPoints("w" ,0,90,fontSize);
    for(let i=0; i<points1.length;i++) {
        pt = points1[i];
        vehicle = new Vehicle(pt.x, pt.y);
        line1.push(vehicle);
    }

    // converts font into an object and converts font to points.
   let points2 = font.textToPoints("e" ,0,190,fontSize);
    for(let i=0; i<points2.length;i++) {
        pt = points2[i];
        vehicle = new Vehicle(pt.x, pt.y);
        line2.push(vehicle);
    }
    let points3 = font.textToPoints("l" ,20,325,fontSize);
    for(let i=0; i<points3.length;i++) {
        pt = points3[i];
        vehicle = new Vehicle(pt.x, pt.y);
        line3.push(vehicle);
    }
    let points4 = font.textToPoints("c" ,0,425,fontSize);
    for(let i=0; i<points4.length;i++) {
        pt = points4[i];
        vehicle = new Vehicle(pt.x, pt.y);
        line3.push(vehicle);
    }
    let points5 = font.textToPoints("o" ,0,525,fontSize);
    for(let i=0; i<points5.length;i++) {
        pt = points5[i];
        vehicle = new Vehicle(pt.x, pt.y);
        line3.push(vehicle);
    }
    let points6 = font.textToPoints("m" ,0,625,fontSize);
    for(let i=0; i<points6.length;i++) {
        pt = points6[i];
        vehicle = new Vehicle(pt.x, pt.y);
        line3.push(vehicle);
    }
    let points7 = font.textToPoints("e" ,0,725,fontSize);
    for(let i=0; i<points7.length;i++) {
        pt = points7[i];
        vehicle = new Vehicle(pt.x, pt.y);
        line3.push(vehicle);
    }
    let points8 = font.textToPoints("!" ,20,870,fontSize);
    for(let i=0; i<points8.length;i++) {
        pt = points8[i];
        vehicle = new Vehicle(pt.x, pt.y);
        line3.push(vehicle);
    }


}


function windowResized() {
    resizeCanvas(75,height);
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


