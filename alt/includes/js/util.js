/*
 *  Superset of personal includes
 *    would be nice to rewrite dline without the translate
 *  Inspiration:
 *    inconvergent
 *
 *  Treat lines/shapes as points in arrays
 *  generally every function returns an array
 */

/**
 *
 *  LINES
 *
 * -  dline = (x1, y1, x2, y2, step = 0.5, off = 1.8)
 *      // hackey line of points
 * -  getBox(ww, hh, v, closed = false)
 *      // returns a box of width ww and height hh, centered at v.
 * -  drawPath (path, closed = false, lnf = ((x1, y1, x2, y2) => line (x1, y1, x2, y2))) 
 *      // takes array of vectors (having .x, .y) and draws a line between each
 *      // takes the line function to use as well
 * -  linspace(n, mi, ma)
 *      // get n numbers evenly distributed between (mi, ma).
 *      // includes the end values.
 * -  getRange (a, b = null)
 *      // get integers from 0 to a-1, or from a to b-1 if b is not null.
 * -  last (l, i = 1)
 *      // get last element of l, (or null)
 *      // use i to get second last element and so forth.
 * -  vec (x, y)
 *      // create vector (x, y) if y is not provided vector will be (x, x)
 *
 */

function hplot (shape, xdetail = 10, ydetail = xdetail, xoff, yoff) {
  let ystart = shape.reduce ((min, cur) => cur.y < min ? cur.y : min, shape[0].y); // ylow
  let yend   = shape.reduce ((max, cur) => cur.y > max ? cur.y : max, shape[0].y); // yhigh
  let xstart = shape.reduce ((min, cur) => cur.x < min ? cur.x : min, shape[0].x); // xlow
  let xend   = shape.reduce ((max, cur) => cur.x > max ? cur.x : max, shape[0].x); // xhigh
  //let ydetail = 10;
  //let xdetail = 10;

  let cs = 0; // crosses kept per edge
  let c = 0; //cross
  let pc = new Array (shape.length).fill (0); // previous cross kept per edge

  for (let y = ystart; y <= yend; y += ydetail) { //for y
    cs = 0; // reset crosses
    c = null;
    pc = pc.map (e => null); // reset array

    for (let x = xstart; x <= xend; x += xdetail) { //for x

      for (let iter = 0; iter < shape.length; iter++) { // for edge

        let sp = shape[iter]; // start point
        let ep = shape[(iter + 1) % shape.length]; // end point

        let bxmax = max (sp.x, ep.x);
        let bymax = max (sp.y, ep.y);
        let bxmin = min (sp.x, ep.x);
        let bymin = min (sp.y, ep.y);

        if (x <= bxmax && x >= bxmin &&
            y <= bymax && y >= bymin) {

          let dxc = x - sp.x;
          let dyc = y - sp.y;

          let dxl = ep.x - sp.x;
          let dyl = ep.y - sp.y;

          c = dxc * dyl - dyc * dxl;

          if (pc[iter] == null) {
            pc[iter] = c;
          }

          if ((c < 0) != (pc[iter] < 0 )) { // a cross happened
            cs++;
          }

          pc[iter] = c; // set previous to current
        }

        if (cs % 2 == 1) { // inside
          //draw
          let xd = x + random (-xoff, xoff);
          let yd = y + random (-yoff, yoff);
          //point (x, y);
          point (xd, yd - 1);
        }
        else {} // (cs % 2 == 0)  ouside
      }
    }
  }
}


dline = (x1, y1, x2, y2, step = 0.5, off = 0.8) => {

  push();
  translate (x1, y1);

  let dx = x2 - x1;
  let dy = y2 - y1;

  rotate (Math.atan2 (dy, dx));

  hlen = Math.sqrt (Math.pow ((x2 - x1), 2) + Math.pow ((y2 - y1), 2));

  for (i = 0; i < hlen; i += step) {
    point (i, 0 + random (-off, off));
  }

  pop();
}

function rndInCirc(rad, xy=vec(0.0)){
  // return a p5.Vector uniformly distributed in a circle with radius rad,
  // centered at xy.
  const a = random(TWO_PI);
  const r = rad * sqrt(random(1));
  return vec(xy.x + r * cos(a), xy.y + r * sin(a));
}

function getBox (ww, hh, v, closed = false) {
  // returns a box of width ww and height hh, centered at v.
  const w = ww * 0.5;
  const h = hh * 0.5;
  let res = [createVector (v.x - w, v.y - h), createVector (v.x + w, v.y - h),
             createVector (v.x + w, v.y + h), createVector (v.x - w, v.y + h)];
  if (closed){
    res.push (res[0].copy());
  }
  return res;
}

function drawPath (path,
                   closed = false,
                   lnf = ((x1, y1, x2, y2) => line (x1, y1, x2, y2))) {
/*
 *  takes array of vectors (having .x, .y) and draws a line between each
 *  takes the line function to use as well
 *
 */

  const len = closed ? path.length : path.length - 1;

  for (let iter = 0; iter < len; iter++) {
    let curr = path[iter];
    let next = path[(iter + 1) % path.length];

    lnf (curr.x, curr.y, next.x, next.y);
  }
}

function linspace (n, mi, ma) {
  // get n numbers evenly distributed between (mi, ma).
  // includes the end values.
  let res = [];
  const s = (ma - mi) / (n-1);
  let y = mi;
  for (let i = 0; i < n; i++){
    res.push(y);
    y += s;
  }
  return res;
}

function getRange (a, b = null) {
  // get integers from 0 to a-1, or from a to b-1 if b is not null.
  if (b === null){
    b = a;
    a = 0;
  }

  let res = [];
  for (let i=a; i<b; i++){
    res.push(i);
  }
  return res;
}

function last (l, i = 1) {
  // get last element of l, (or null)
  // use i to get second last element and so forth.
  return l.length>(i-1) ? l[l.length-i] : null;
}

function vec (x, y = null) {
  // create a vector (x, y). if y is not provided, the vector will be (x,x)
  return createVector (x, y || x);
}

function times (n, f, step = 1) {
  for (let i = 0; i < n; i += step) {
    f (i);
  }
}

//130

/*
repeat = n => f => x => {
  if (n > 0)
    return repeat (n - 1) (f) (f (x))
  else
    return x
}

times = n => f =>
  repeat (n) (i => (f(i), i + 1)) (0)

for_ = (cur, cond, next, fbody) => {
  cond (cur) ?
    (fbody(cur), cur = next(cur), for_(cur, cond, next, fbody)) : cur;
}

each = (list, f) => {
  if (list.size == 0) { return; }

  for_ (0, (x) => x < list.size, (x) => (x + 1), (x) => f(list.get(x), x));
}
*/
