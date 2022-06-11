var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d");
let info = {
  fps: 60,
  width: canvas.width,
  height: canvas.height,
};

function resize() {
  info.width = canvas.width = window.innerWidth;
  info.height = canvas.height = window.innerHeight;
}
resize();
window.onresize = resize;

frameDataArray = new FrameDataArray(10);
fs.writeFile('/Users/otto/Desktop/test.json', '', err => {
  if (err) {
    console.error(err);
  }
// file written successfully
});

(function loop() {
  var time = performance.now();

  noisePutImage(ctx, frameDataArray);
  //noiseDrawImage(ctx, 10);

  time = (performance.now() - time) * 1000;
  putInfo(time);
  requestAnimationFrame(loop);
})();

