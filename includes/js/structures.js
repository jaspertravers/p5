dline = (x1, y1, x2, y2, step, off) => {

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

//dlinep takes points which have .x and .y properties
dlinep = (p1, p2, step, off) => {

  push();
  translate (p1.x, p1.y);

  let dx = p2.x - p1.x;
  let dy = p2.y - p1.y;

  rotate (Math.atan2 (dy, dx));

  hlen = Math.sqrt (Math.pow ((p2.x - p1.x), 2) + Math.pow ((p2.y - p1.y), 2));

  for (i = 0; i < hlen; i += step) {
    //point (i + random (-off, off), 0 + random (-off, off));
    point (i, 0 + random (-off, off));
    //point (i + random (-off, off), 0);
    
  }

  pop();
}

//unit: {w, h, indent}
//grid: {xdim, ydim}
gridgen = (unit, grid) => f => {
  //want a centered grid of units at specified sizes
  xmargin = width  - (unit.w * grid.xdim);
  ymargin = height - (unit.h * grid.ydim);

  push();
  translate (xmargin / 2, ymargin / 2);

  for (x = 0; x < grid.xdim; x++) {
    for (y = 0; y < grid.ydim; y++) {
      push();
      //translate (x * unit.w, y * unit.h);
      //draw a hex every w, but w is offset every other row

      translate  (x * unit.w,
                  y * unit.h);

      f    (0      +  unit.indent *1,
            0      +  unit.indent *1,
            unit.w -  unit.indent *1,
            unit.h -  unit.indent *1);
      pop();
    }
  }

  pop();
}
