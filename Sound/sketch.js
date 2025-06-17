
let xArray = [];
let yArray = [];
let initalSizeOfArray = 20; // i can use any number here
let bap;

function preload(){
 bap = loadSound("sounds/kick.mp3") 
}

function setup() {
 createCanvas(800, 500);
 
 for(let i = 0; i < initalSizeOfArray; i++){


   xArray[i] = random(0, width);
   yArray[i] = random(0, height);


 }
 }


function draw() {
 background(220);


 for(let i = 0; i < xArray.length; i++){
   let x = xArray[i];
   let y = yArray[i];
   circle(x, y, 20);

   xArray[1] += 1;
 }
 }
function mousePressed(){
  bap.play()
  xArray.push(mouseX);
  yArray.push(mouseY)
}