/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/
//brendan
let angle = 0;
let rocket = 100;
let rxSpeed = 10;
let lightsOn = false;
let largeSize = false;
let largeSize2 = false;
let rocket1X = -50;
let rocket1Xmove = false;
let rocket1XSpeed = 9;
let rocketsLeaving = false;
//let initalSizeOfArray = 0;
let stage = 0;
let alienY = 380;
let alienYspeed = 2;


//let rx = [300, 200, 400]; // make them appear from the start
//let ry = [300, 200, 200]; // make them appear from the start
let rx = []; // start off with no UFOs
let ry = []; // start off with no UFOs
let xArray = [];
let yArray = [];
let initialSizeOfArray = 5;
function setup() {
  // createCanvas(800, 500);
let canvas = createCanvas(800, 500);
canvas.parent("p5-canvas-container");
  for (let i = 0; i < initialSizeOfArray; i++) {
    xArray[i] = random(0, 500);
    yArray[i] = random(0, 250);
  }
  // let canvas = createCanvas(800, 500);
  // canvas.parent("p5-canvas-container");

  //for (let i = 0; i < initalSizeOfArray; i++) {
  // rx[i] = random(0, 500);
  //ry[i] = random(0, 380);
  //}

  // let rx = 50; // local variable, local to this setup funciton
  // r1x = random(0, 500);
  //  console.log(random(50, 60))
  //  r1y = random( 0, 300);
  //  r2x = random(0, 500);
  //  r2y = random(0, 300);
}


function draw() {
  // Stage 0
  if (stage === 0) {
    background("rgb(9,191,207)");
    fill("lightgreen");
    noStroke();
    rect(0, 400, width, 30);
    fill("#DBB782");
    noStroke();
    rect(0, 430, width, 70);

    drawCloud(200, 200);
    drawCloud(100, 100); 
    drawCloud(400, 200);
    drawCloud(300, 100); 
    drawSun(680, 100);
    
    alienY += alienYspeed;
if (alienY > 420 || alienY < 340) {
  alienYspeed *= -1;
}

    
    drawAlien(300, alienY);

    textSize(34);
    fill(255);
    text("Creature Spotted! Press 'e' to investigate", 50, 470);
    return;
  }
  
  
  
  for (let i = 0; i < rx.length; i++) {
    //rx[i] += 1;
    if (rocketsLeaving) {
      ry[i] -= 5; // Move up quickly when leaving
    } else {
      let x = rx[i];
      let y = ry[i];
    }
     rx[i] += random(-1, 1);
     ry[i] += random(-1, 1);
  }

  background("midnightblue");
  fill("green");
  noStroke();
  rect(0, 400, width, 30);
  fill("#DBB782");
  noStroke();
  rect(0, 430, width, 70);

  {
  textSize(34);
  fill(255);
  text("Press 'a' to attack!",100, 470);
  text("Press 'b' to retreat", 400, 470);
}
  
  
  drawRocket(rocket1X, 400, 200);

  if (rocket1Xmove) {
    rocket1X += rocket1XSpeed;
    if (abs(rocket1X - 300) < 30) {
      rocket1XSpeed = -rocket1XSpeed;
      largeSize2 = true;
      
    }
  }

  if (rocket1Xmove == true) {
  }

  for (let i = 0; i < xArray.length; i++) {
    let x = xArray[i];
    let y = yArray[i];
    drawCloud(x, y);

    drawMoon(680, 100);
    drawAlien(300, 380);
    //for(let i = 0; i < xArray.length; i++){
    // let x = xArray[i];
    // let y = yArray[i];
    //drawCloud(x, y);
  }
  // drawRocket( rx[0] , ry[0] )
  // drawRocket(r1x, r1y);
  // ry = ry + 1
  // //drawRocket(rx[1], ry[1]);
  // drawRocket(400, 200);

  // drawRocket(rx, 300, 400);
  // drawRocket(ry, 400, 400);
  //rx += rocketSpeed;
  //if(rocket>width){
  // rocket = 0

  for (let i = 0; i < rx.length; i += 1) {
    // console.log(i)
    drawRocket(rx[i], ry[i]);
  }
}
function drawRocket(x, y) {
  // function DEFINITION
  push();
  translate(x, y);
  stroke("white");
  fill("rgba(78,71,71,0.91)");
  ellipse(0, -5, 60, 60); // function CALL
  stroke("white");
  fill("black");
  ellipse(0, 0, 100, 40);

  if (lightsOn == true) {
    // beam
    fill(205, 224, 14, 189);
    noStroke();
    triangle(30, 75, 0, 0, -35, 75);
    //triangle(30, 75, 58, 20, 86, 75);
  }

  fill("lightblue");
  circle(0, 0, 10);

  pop();
}

function drawMoon(x, y) {
  //moon
  push();
  translate(x, y);
  fill("lightyellow");
  noStroke();
  circle(0, 0, 180);

  fill("midnightblue");
  noStroke();
  circle(-50, -20, 90);

  pop();
}

function keyPressed() {
  // Stage 0
  if (stage === 0 && key === "e") {
    stage = 1;
    return;
  }
  // Stage 1
  if (stage === 1 && key === "a") {
    rx = [300, 200, 400];
    ry = [250, 200, 200];
    stage = 2;
    return;
  }
  
  // Stage 2
  if (stage === 2 && key === "a") {
    lightsOn = true;
    largeSize = true;
    stage = 3;
    return;
  }
  // Stage 3
  if (stage === 3 && key === "a") {
    rocket1Xmove = true;
    lightsOn = false;
    stage = 4;
    return;
  }
  // Stage 4
  if (stage === 4 && key === "b") {
    rocketsLeaving = true;
    return;
  }
}


// function keyPressed(){
//  if (key ==="s"){
//   lightsOn = false;
// }
// }
function drawCloud(x, y) {
  push();
  translate(x, y);
  noStroke();
  fill("white");
  circle(0, 10, 50);
  circle(50, 0, 90);
  circle(100, 10, 50);
  pop();
}

function drawAlien(x, y) {
  push();
  translate(x, y);

  if (largeSize == true) {
    scale(1.5);

    if (largeSize2 == true) {
      scale(1.5);
    }
  }
  stroke("white");
  fill("orange");
  ellipse(0, 0, 15, 70);
  ellipse(-15, -5, 15, 30);
  ellipse(15, -5, 15, 30);
  ellipse(5, 30, 10, 40);
  ellipse(-5, 30, 10, 40);
  fill("orange");
  circle(0, -15, 25);
  ellipse(0, -20, 50, 10);
  textSize(30);
  text("🦁", -15, -20);
  pop();
}
function drawSun(x, y) {
  push();
  translate(x, y);
  fill("#FFC107");
  noStroke();
  circle(0, 0, 180);
  pop();
}


