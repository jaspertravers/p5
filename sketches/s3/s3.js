var s = {}; //state

function setup() {
  BACKGROUND = '#fffbf4'; //BACKGROUND = '#fcfaea';
  STROKE = '#282828';
  createCanvas(windowWidth - 0, windowHeight - 0);
  background(BACKGROUND);
  stroke(40, 40, 40, 100);
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
  let my = height / 2;
  let pts = [];
  let paths = [];

  sg = new SandGen (400, 1, 1);

  for (let x = 100; x < width - 100; x += 50) {
    pts.push (vec (x, my + random (-1, 1) * 100));
  }
  subdivision (pts);

  pts.forEach ((e, i) => paths.push (sg.generate 
                                      (e, pts[((i + 1 >= pts.length) ? i: i + 1)])));

  paths.forEach (e => e.forEach (el => point (el[0], el[1])));

}

function subdivision (path) {
  // for every segment, cut first and last 25% and create new line to next
  // segments cuts
  // path is of the format [p1, p2, p3,...]
  let res = [];
  for (let iter = 0; iter < path.length - 1; iter += 1) {
    let p1 = path[iter]
    let p2 = path[iter + 1]

    let mx = p2.x - p1.x / 2;
    let bx = (mx - p1.x / 2) + p1.x; //bot new x
    let tx = (p2.x - mx / 2) + mx;   //top new x

    let my = p2.y - p1.y / 2;
    let by = (my - p1.y / 2) + p1.y; //bot new y
    let ty = (p2.y - my / 2) + my;   //top new y

    let q = vec (bx, by);
    let r = vec (tx, ty);
    res.push (q);
    res.push (r);
  }
  drawPath (res);
}

class SandGen {
  constructor (n, t, off) {
    this.n = n;
    this.t = t;
    this.off = off;
  }
  generate ({x: x1, y: y1}, {x: x2, y: y2}) {
    let xs = linspace (this.n, x1, x2);
    let ys = linspace (this.n, y1, y2);
    let pts = zip (xs, ys);

    let mod = pts.map (e => e.map (el => el + random (-this.off, this.off)));

    return mod;
  }
}


function keyPressed() {
  switch (key) {
    case 's':
      let time = "" + year () + "_" + month() + "_" + day() + "_" + hour() + minute() + second();
      save (time + "_" + "sketch.png");
      break;
    default:
      //console.log ("missed switch");
  }
}
