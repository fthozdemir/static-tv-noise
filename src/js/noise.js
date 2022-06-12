function noisePutImage(ctx, frameDataArray) {
  let noiseData = ctx.createImageData(info.width, info.height);
  const width = noiseData.width;
  const height = noiseData.height;


  // manipulate canvas pixels
  for (let x = 0; x < width-1; x +=2) {
    for (let y = 0; y < height-1; y +=2) {
      randomAlphaValue = Math.random() > 0.55 ? 255 : 0;
      index = 4*(x*height + y) + 3; // 4th channel is alpha channel
      noiseData.data[index] = 
      noiseData.data[index +4] = 
      noiseData.data[index+height*4]= 
      noiseData.data[index+4+height*4]= randomAlphaValue;  // for make it more likely as target video ,the 4 pixels have same value in every frame
    }
  }

  if (info.isLogActive)
    addFrameArrayAsync(noiseData, frameDataArray);

  ctx.putImageData(noiseData, 0, 0);
}

async function addFrameArrayAsync(noiseData, frameDataArray) {
  await addFrameArray(noiseData, frameDataArray);
}
