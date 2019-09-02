variables:
  dim
  k
  num
  maxnum
  time

  ticks
  frms

setup:
  sweeps = new Sweep[maxnum]
  int g=int(dim/k);
  for (int y=0;y<k;y++) {
    sweeps[num] = new Sweep(0,random(dim),g*10);
    num++;
  }

loop:
  time++;
  for (int n=0;n<num;n++) {
    sweeps[n].render();
  }

class Sweep:
    ox, oy
    x, y
    vx

    ogage, gage

    color

    time
    sc, sg

  ctor:
    X, Y, Gage
    reset()

  reset:
    new color
    sg = random (0.01, 0.1);
    x = ox
    y = oy
    gage = ogage
    vx = 1.0

  render:
    x+=vx
    if x>dim reset()

