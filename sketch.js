var mySong;     // background sound
var myPics;     // backgorund image
var dis = 15;   // distance between each ellipse
var wid;        // width of wave
var hei = 70;   // height of wave
var ang = 0;    // start angle 
var per = 400;  // period of wave repeats
var dx;         // x increment
var yvalues;    // array to have different height values


function preload() {
mySong = loadSound("./assets/mysong.mp3");
myPics = loadImage("./assets/paesaggio.jpg");

}

function setup() {
   createCanvas(windowWidth, windowHeight);
   imageMode(CENTER);
  wid = width + 15;
  dx = (TWO_PI / per) * dis;
  yvalues = new Array(floor(wid/dis));
  
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
  mySong.loop();

}

function draw() {
  background(0);
  image(myPics,width/2,height/2,myPics.width/2,myPics.height/2);
  calcWave();
  displayWave();
}

function calcWave() {
  var vol = analyzer.getLevel();
  ang += vol/2; // angle increment
  var x = ang;
  
  // sine function
  for (var a = 0; a < yvalues.length; a++) {
    yvalues[a] = sin(x)*hei;
    x+=dx;
  }
}

function displayWave() {
  noStroke();
  fill(255,100);
  for (var x = 0; x < yvalues.length; x++) {
    ellipse(x*dis, height/2+yvalues[x], 15, 15);
  }
}

function windowResized() {
  resizeCanvas(windowWidth,windowHeight);
}