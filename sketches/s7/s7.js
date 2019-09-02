var feed;

function setup() {
  BACKGROUND = '#fffbf4';
  STROKE = '#282828';
  createCanvas(windowWidth - 0, windowHeight - 0);
  background(BACKGROUND);
  stroke(STROKE);
  noFill();
  //noLoop();
  strokeWeight(1);

  build();
}

function draw() {
  sketch();
}

// once
function build () {
  feed = newFeed();
}

function BG () {
  let xstep = 10;
  let ystep = 10;
  for (let x = xstep; x < width; x += xstep) {
    for (let y = ystep; y < height; y += ystep) {
      point (x, y);
    }
  }
}

// loop
function sketch () {
  background ('#fffbf4')
  BG();
}

function mouseClicked() {
  feed.add (vec (mouseX, mouseY));
}

function newFeed () {
  const points = [];
  const lines = [];
  return {
    add: (p) => {
      points.push {p: p}
      this.update()
    }
    update: () => {
      while (points.length > 2) {
        lines.push (
          {
            p1: points.shift(), p2: points.shift()
          }
      )
      }
    }
  }
}

///

const altStack = () => {
  const items = [];
  return {
    depth: () => items.length,
    top:   () => items[items.length - 1],
    pop:   () => { items.pop() },
    push: item => { items.push(item) }
  }
}
