

class FrameDataArray {
  constructor(size) {
    this.array = [];
    this.size = size;
    this.length = 0;
    this.head = 0;
  }
  push(element) {
    if (this.length < this.size) {
      this.array[this.length] = element;
      this.length++;
    } else {
      this.array[this.head] = element;
      this.head++;
      if (this.head >= this.size-1) this.head = 0;
    }
  }
  popAll() {
    var elementsFIFO = {};
    for (var i = 0; i < this.length; i++) {
      if (this.head < this.length) {
        elementsFIFO[i] = this.array[this.head];
        this.head++;
      } else {
        this.head = 0;
        elementsFIFO[i] = this.array[this.head];
        this.head++;
      }
    }

    return elementsFIFO;
  }
}
function logData(data) {
  console.log(JSON.stringify(data));
}

//2
async function reFormatPixelData(noiseData) {

  const width=noiseData.width;
  const height=noiseData.height;
  let frameData = Array(width*height);
  let index =0;
  for (let x = 0; x < width; x ++) {
    for (let y = 0; y < height; y ++) {
    let color = noiseData.data[x*y + 3] > 0 ? "black" : "white";
    frameData[index++]={ x: x, y: y, color: color };
    }
}
return frameData;
}
//1
function reFormatPixelDataJSON(noiseData) {
  let jsonString = '{"resolution":"1920x1080" data":[';
  const width=noiseData.width;
  const height=noiseData.height;
  for (let x = 0; x < width; x ++) {
    for (let y = 0; y < height; y ++) {
    let color = noiseData.data[x*y + 3] > 0 ? "black" : "white";
    jsonString += '{"x":' + x + ',"y":' + y + ',"color":' + color + "},";
  }
}
  jsonString += "]}";
}

/*
*
* log dosyası tutmaya çalışırken bir çok yol denedim ama hata aldım. Class datası olarak tutarken(1) veya string(2) olarak tutarken memory taştı
* stringleri memoryde tutmadan yazmaya kalkışınca da (3) "too many open files" hatası
*
*/
async function addFrameArray(noiseData, frameDataArray) {
 await  reFormatPixelData(noiseData)
   .then(formattedArray => {
    frameDataArray.push(formattedArray);
   })
   .then(writeJSON(JSON.stringify(frameDataArray)));

}


async function appendJSON(content)
{
  const fs = require ('fs').promises;
  try{
    await fs.appendFile('/Users/otto/Desktop/test.json', content )
  }
    catch(error){
      console.error(error);
    }
}

async function writeJSON(content)
{
  const fs = require ('fs').promises;
  try{
    await fs.writeFile('/Users/otto/Desktop/test.json', content )
  }
    catch(error){
      console.error(error);
    }
}

//3
function writePixelDataJSON(noiseData) {
  let x = 0;
  let y = 0;
  const len = noiseData.data.length;
  let jsonString = '{"resolution":"1920x1080" "data":[';
  appendJSON(jsonString);
  for (let i = 0; i < len; i += 4) {
    let color = noiseData.data[i + 3] > 0 ? "black" : "white";
    jsonString += '{"x":' + x + ',"y":' + y + ',"color":"' + color + '"},';
    y ++;
    if (y > info.height) {
      appendJSON(jsonString);
      y = 0;
      x++;
      jsonString = '';
    }
  }
  jsonString += "]}";
  appendJSON(jsonString);
}

