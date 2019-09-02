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

// loop || "once but not build" if noLoop()
function sketch () {
  let mx = width  / 2;
  let my = height / 2;
  
  //line (mx, my, mx - 100, my);
  //line (mx, my, mx, my - 100);

  let step = 5;
  let scale = 400;
  let n = 320;
  let t = 1;
  let offset = 1;
  for (let iter = step; iter < scale; iter += step) {
    sand (mx - scale + iter, my, mx, my - iter, n, t, offset);
    sand (mx + scale - iter, my, mx, my + iter, n, t, offset);

    //line (mx - scale + iter, my, mx, my + iter);
    //line (mx + scale - iter, my, mx, my - iter);
  }
}


/*
 * n: number of points
 * v: line begin
 * w: line end
 * t: times
 * offset: how much each point varries per iteration
 *
 * //rgba: color/transparency
 */

function sand (x1, y1, x2, y2, n, t, offset) {
  let xs = linspace (n, x1, x2);
  let ys = linspace (n, y1, y2);

  let pts = zip (xs, ys);

  let points = pts.map (e => e.map (el => el + random (-offset, offset)));
  points.forEach (e => point (e[0], e[1]));

}

const zip = (arr, ...arrs) => {
  return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
}

function keyPressed() {
  switch (key) {
    case 's':
      let time = "" + year () + "_" + month() + "_" + day() + "_" + hour() + minute() + second();
      save (time + "_" + "s1.png");
      break;
    default:
      //console.log ("missed switch");
  }
}

