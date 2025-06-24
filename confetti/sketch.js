let confettis = [];
numConfettis = 10;

let backgroundHue = 0

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

 // for(let i = 0; i < numConfettis; i++){
 // confettis.push(new Confetti(width/2,height/2))
 // }

colorMode(HSB);
}

function draw() {
  background(255, 255, 255);
if(mouseIsPressed ==true){

  for(let i = 0; i < numConfettis; i++){
  confettis.push(new Confetti(mouseX,mouseY))
}
}
//confettis.push(new Confetti(width/2,height/2))

  for(let i = 0; i < confettis.length; i++){
    confettis[i].update();
    confettis[i].display();
    confettis[i].checkOnScreen();
  }
  fill(255);
  text(confettis.length, 20, 20)

  //if(confettis.length > 40){
  // while(confettis.length>1000){
  // confettis.splice(0,1);
  // }
   

  for(let i = 0; i < confettis.length; i++){
    if(confettis[i].onScreen == false){
    confettis.splice(i, 1);

    }
    
  }

  }
//}

class Confetti{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.size = random(2, 10);
    
    this.speedX = random(-2, 2);
    this.speedY = random(-1, -3);   

    this.c = color(random(360), 255, 255)
    this.onScreen = true;
  }
  update(){
    this.x+=this.speedX;
    this.speedX *= 0.99;


    this.y+=this.speedY;
    this.speedY += 0.1;
  }
  display(){    
    push();
    translate(this.x, this.y);

      fill(this.c);
      noStroke();
      circle(0, 0, this.size);
   
    pop();
  }
checkOnScreen(){
  if(this.y > height)
    this.onScreen = false;
  }
}
// function mousePressed(){
//for(let i = 0; i < numConfettis; i++){
 // confettis.push(new Confetti(mouseX,mouseY))

 //}
//}