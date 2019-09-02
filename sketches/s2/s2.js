var s = {}; //state

function setup() {
  BACKGROUND = '#fffbf4'; //BACKGROUND = '#fcfaea';
  STROKE = '#282828';
  createCanvas(windowWidth - 0, windowHeight - 0);
  background(BACKGROUND);
  stroke(40, 40, 40, 120);
  noFill();
  noLoop();
  strokeWeight(1);

  build();
}

function draw() {
  sketch();
}

// once
function build () {
}

// loop
function sketch () {
  let paths = [];
  let s1 = new Sand (200, 100, 800, 100, 1000, 1, 1);
  s1.display();
  let sgen = new SandGen (2000, 1, 4.0);
  let path = sgen.generate (200, 110, 800, 110);
  for (let iter = 0; iter < 400; iter += 1) {
    paths.push ( sgen.generate(200, 200 + iter, 800, 200 + iter) );
  }
  paths.forEach (e => e.forEach (el => point (el[0], el[1])));
}

//what if Sand was a generator?

class SandGen {
  constructor (n, t, off) {
    this.n = n;
    this.t = t;
    this.off = off;
  }
  generate (x1, y1, x2, y2) {
    let xs = linspace (this.n, x1, x2);
    let ys = linspace (this.n, y1, y2);
    let pts = zip (xs, ys);

    let mod = pts.map (e => e.map (el => el + random (-this.off, this.off)));

    return mod;
  }
}


class Sand {
  constructor (x1, y1, x2, y2, n, t, off) {
    this.xs = linspace (n, x1, x2);
    this.ys = linspace (n, y1, y2);
    this.pts = zip (this.xs, this.ys);
    this.n = n;
    this.t = t;
    this.off = off;
    this.modify();
  }
  modify () {
    this.mod = this.pts.map (e => e.map (el => el + random (-this.off, this.off)));
  }
  display () {
    this.mod.forEach (e => point (e[0], e[1]));
  }
}

function keyPressed() {
  switch (key) {
    case 's':
      let time = "" + year () + "_" + month() + "_" + day() + "_" + hour() + minute() + second();
      save (time + "_" + "s2.png");
      break;
    default:
      //console.log ("missed switch");
  }
}
