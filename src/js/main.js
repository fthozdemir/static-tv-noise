var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d");
let info = {
  fps: 60,
  width: canvas.width,
  height: canvas.height,
  isLogActive: false
};

function resize() {
  info.width = canvas.width = window.innerWidth;
  info.height = canvas.height = window.innerHeight;
}
resize();
window.onresize = resize;


function initiliaze() {
  frameDataArray = new FrameDataArray(10);
  fs.writeFile('/Users/otto/Desktop/test.json', '', err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
}
initiliaze();

var btn = document.getElementById("logActivity");
btn.onclick = function () {
  info.isLogActive = !info.isLogActive;
  btn.innerHTML=info.isLogActive ? "LOG ON" : "LOG OFF";
};

  (function loop() {

    noisePutImage(ctx, frameDataArray);
    //noiseDrawImage(ctx, 10);
    putInfo();
    requestAnimationFrame(loop);
  })();
