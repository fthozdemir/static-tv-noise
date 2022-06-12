
let canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d");

let info = {
  fps: 60,
  width: canvas.width,
  height: canvas.height,
  isLogActive: false,
  logFrameCount: 10,
  infoResolutionString: ''
};

function resize() {
  info.width = canvas.width = window.innerWidth;
  info.height = canvas.height = window.innerHeight;
  info.infoResolutionString = info.width + " x " + info.height;
}

resize();
window.onresize = resize;

(function loop() {

  noisePutImage(ctx);
  putInfo();
  requestAnimationFrame(loop);
})();

