
//
function fpsMeter() {
  let prevTime = performance.now(),
    frames = 0;

  requestAnimationFrame(function loop() {
    const time = performance.now();
    frames++;
    if (time > prevTime + 1000) {
      let fps = Math.round((frames * 1000) / (time - prevTime));
      prevTime = time;
      frames = 0;
      info.fps = fps;
    }

    requestAnimationFrame(loop);
  });
}

function putInfo(time) {
  //fpsMeter();
  ctx.font = "30px Arial";
  ctx.fillStyle = "orange";
  let infoText =
    "Resolution:" + info.infoResolutionString ;

  ctx.fillText(infoText, 50, 50);
}
