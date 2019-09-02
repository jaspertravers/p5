var s = {}; //state
var sweeps;
var dim;

function setup() {
  BACKGROUND = '#fffbf4'; //BACKGROUND = '#fcfaea';
  STROKE = '#282828';
  createCanvas(windowWidth - 0, windowHeight - 0);
  background(BACKGROUND);
  stroke(STROKE);
  noFill();
  noLoop();
  strokeWeight(1);
  //colorMode (HSB, 100); //change color from RGB to HSB

  build();
}

function draw() {
  sketch();
}

// once
function build () {
  dim = 500;
  var k = 22;

  sweeps = [];
  let g = floor (dim / k);
  for (let iter = 0; iter < k; iter += 1) {
    sweeps[iter] = new Sweep (0, floor (random (dim)), g * 10);
  }
}

// loop
function sketch () {
  for (let time = 0; time < 10; time+=2) {
    if (time % 20 == 0) console.log (time);
    sweeps.forEach (e => e.render());
  }
  //sweeps.forEach (e => e.render());
}

class Sweep {
  constructor (X, Y, Gage) {
    let ox, oy;
    let x, y;
    let vx;

    let ogage, gage;

    let myc;  //mycolor

    let sc, sg;

    this.ox = this.x = X;
    this.oy = this.y = Y;
    this.ogage = this.gage = Gage

    this.reset();
  }

  reset () {
    this.myc = getcolor();
    this.sg = random (0.01, 0.1);
    this.x = this.ox;
    this.y = this.oy;
    this.gage = this.ogage;
    this.vx = 1.0;
  }

  render () {
    this.x += this.vx * 2;

    if (this.x > dim) this.reset();

    //tpoint (this.x, this.y, this.myc, 0.07);
    point (this.x, this.y);
    push();
    stroke (0);
    point (this.x, this.y);
    pop();

    this.sg += random (-0.042, 0.042);

    let wd = 200;
    let w = this.sg / wd;
    console.log (wd);
    for (let iter = 0; iter < wd; iter++) {
      let yplace = this.y + this.gage * sin (iter * w);
      let aplace = 0.1 - iter / (wd * 10 + 10);
      tpoint (this.x, this.y + this.gage * sin (iter * w),
              this.myc, 0.1 - iter / (wd * 10 + 10));
      tpoint (this.x, this.y - this.gage * sin (iter * w),
              this.myc, 0.1 - iter / (wd * 10 + 10));

      //point (this.x, this.y + this.gage * sin (iter * w));
      //point (this.x, this.y - this.gage * sin (iter * w));
    }
  }
}

function tpoint (x, y, myc, a) {

  //let c = get (x, y);
  let c = color (40, 40, 40);
  //console.log (red(c));

  r = red (c) + (red (myc) - red (c) * a);
  g = green (c) + (green (myc) - green (c) * a);
  b = blue (c) + (blue (myc) - blue (c) * a);

  let nc = color (r, g, b);
  stroke (nc);
  point (x, y);
}

function getcolor () {
  return ("#000000");
  palette = ["#3a242b",
             "#3b2426",
             "#352325",
             "#836454",
             "#7d5533",
             "#8b7352",
             "#b1a181",
             "#a4632e",
             "#bb6b33",
             "#b47249",
             "#ca7239",
             "#d29057",
             "#e0b87e",
             "#d9b166",
             "#f5eabe",
             "#fcfadf",
             "#d9d1b0",
             "#fcfadf",
             "#d1d1ca",
             "#a7b1ac",
             "#879a8c",
             "#9186ad",
             "#776a8e",
             "#000000",
             "#000000",
             "#000000",
             "#000000",
             "#000000",
             "#000000",
             "#FFFFFF",
             "#FFFFFF",
             "#FFFFFF",
             "#FFFFFF",
             "#FFFFFF",
             "#FFFFFF"];

  let choice = (palette[floor (random (palette.length))]);
  return choice;
}
