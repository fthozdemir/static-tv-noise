function noisePutImage(ctx, frameDataArray) {
  const noiseData = ctx.createImageData(info.width, info.height);

  var w = 0;
  var len = noiseData.data.length;
  for (let i = 0; i < len - info.width; i += 8) {
    // Modify pixel data
    randomValue = Math.random() > 0.55 ? 255 : 0;
    noiseData.data[i + 3] = randomValue;

    noiseData.data[i + 7] = randomValue;

    noiseData.data[i + info.width * 4 + 3] = randomValue;

    noiseData.data[i + info.width * 4 + 7] = randomValue;

    w += 2;
    if (w > info.width) {
      i += w * 4 - 8;
      w = 0;
    }
  }

  addFrameArray(noiseData, frameDataArray);
  ctx.putImageData(noiseData, 0, 0);
}

/*
 *
 * While testing , major fps decrease observed. To fix that I tried another method.
 *
 * one of the article says DrawImage have better performance.
 * So that, I used an algorithm witch perform processes in downscaled canvas than
 * copy it upscaled one. But it looked still not have better performance.
 *
 *
 */
function noiseDrawImage(ctx, scaleRatio) {
  let c1 = document.createElement("canvas");
  c1.width = info.width / scaleRatio;
  c1.height = info.height / scaleRatio;
  let ctx1 = c1.getContext("2d");
  const noiseData = ctx1.createImageData(c1.width, c1.height);

  // Iterate through every pixel
  for (let i = 0; i < noiseData.data.length; i += 4) {
    // Modify pixel data
    randomValue = Math.random() > 0.5 ? 255 : 0;
    noiseData.data[i + 3] = randomValue;
  }

  ctx1.putImageData(noiseData, 0, 0);
  canvas.width = info.width;
  canvas.height = info.height;
  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;

  ctx.drawImage(c1, 0, 0, info.width, info.height);
}
