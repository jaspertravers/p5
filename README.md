# Sandyland

This is not the first time I have "restarted" my p5 directory. This time I'm going to make it script driven from the outset, and make all workflow decisions formal and only change them via the scripts

### Sketches

#### Process

`p5/sketches/sketch`

Each sketch will have its own folder under `p5/sketches/*` and have its `.html`, `.css`, and `.js`

`src/`

There will be a mirrored image hirerarchy as:
`p5/images/<name>/<seed>.png`


philosophy: everything is tied together by the unix timestamp seed

TODO:

- [ ] git history of source code on each commit, not just image
- [ ] use `n`
- [ ] everything to do with seeds/image saving

---

# Alt

### Process

s is for start

1. `./s` name
2. position chromium window
3. hide browser-sync terminal
4. vim js/name.js
5. `:w` to run sketch

Requires some window management and actually editing the doc `vim js/<name>.js`

#### Start on Existing Sketch
./s name

#### Start on New Sketch
./s name

## TODO

- [ ] programatically add sketches to index.html
- [ ] save image and git commit with each save; or maybe each special vim hook?
- [ ] next


