
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

// create an frame Data object file for logging mechanisim, in this case allways keep last 10 frame
frameDataArray = new FrameDataArray(info.logFrameCount);

resize();
window.onresize = resize;

(function loop() {

  noisePutImage(ctx, frameDataArray);
  putInfo();
  requestAnimationFrame(loop);
})();

// switch on/ off log mechanism, opening it significantly decrease performance 
var btn = document.getElementById("logActivityButton");
btn.onclick = function () {
  info.isLogActive = !info.isLogActive;
  btn.innerHTML = info.isLogActive ? "LOG ON" : "LOG OFF";
};