var s = {}; //state

function setup() {
  BACKGROUND = '#fffbf4'; //BACKGROUND = '#fcfaea';
  STROKE = '#282828';
  createCanvas(windowWidth - 0, windowHeight - 0);
  background(BACKGROUND);
  stroke(STROKE);
  noFill();
  noLoop();
  strokeWeight(1);
  colorMode (HSB, 100); //change color from RGB to HSB

  build();
}

function draw() {
  sketch();
}

// once
function build () {
  s.n = 400;
  s.t = 3;
  s.offset = 0.80;
}

class Sweep {
  constructor (X, Y, Gage) {
    let ox, oy;
    let x, y;
    let vx;

    let ogage, gage;

    let myc;  //mycolor

    let time;
    let sc, sg;

    ox = x = X;
    oy = y = Y;
    ogage = gage = Gage

    this.reset();
  }

  reset () {
    this.myc = getcolor();
    sg = random (0.01, 0.1);
    x = ox;
    y = oy;
    gage = ogage;
    vx = 1.0;
  }

  render () {
    x += vx;

    if (x > dim) this.reset();
    tpoint (x, y, myc, 0.07);

    sg += random (-0.042, 0.042);

    if (sg < -0.3) {
      sg = -0.3;
    }
    if (sg > 0.3) {
      sg = 0.3;
    }
    if (sg > -0.01 && sg < 0.01) {
      if (random(10000)>9900) myc = getcolor();
    }
  }
}

function tpoint (x, y, myc, a) {
  let c = get (x, y);

  r = red (c) + (red (myc) - red (c) * a);
  g = green (c) + (green (myc) - green (c) * a);
  b = blue (c) + (blue (myc) - blue (c) * a);

  let nc = color (r, g, b);
  stroke (nc);
  point (x, y);
}

function getcolor () {
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

  return (palette[random (palette.length)]);
}
