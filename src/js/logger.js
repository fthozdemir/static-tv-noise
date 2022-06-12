class FrameDataArray {
  constructor(size) {
    this.resulotion = 0;
    this.array = [];
    this.size = size;
    this.length = 0;
    this.head = 0;
  }
  //this push guaranties the last 10 frame storing. 
  push(element) {
    this.resulotion = info.infoResolutionString;
    if (this.length < this.size) {
      this.array[this.length] = element;
      this.length++;
    } else {
      this.array[this.head] = element;
      this.head++;
      if (this.head == this.size) this.head = 0;
    }
  }

  // if need, pop all the last frame data in FIFO. for now json.stringify is enough.
  popAll() {
    var elementsFIFO = [];
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

// Tried several ways to write file.

//  return each frame data as an array of Json objects.
async function formatPixelDataAsObject(noiseData) {

  const width = noiseData.width;
  const height = noiseData.height;
  let frameData = [];
  let index = 0;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let color = noiseData.data[4 * index + 3] > 0 ? "black" : "white";
      frameData[index++] = { x: x, y: y, color: color };
    }
  }
  return frameData;
}

//  return each frame data as expected string.

function formatPixelDataAsString(noiseData) {
  let jsonString = '{"resolution":"1920x1080" data":[';
  const width = noiseData.width;
  const height = noiseData.height;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let color = noiseData.data[x * y + 3] > 0 ? "black" : "white";
      jsonString += '{"x":' + x + ',"y":' + y + ',"color":' + color + "},";
    }
  }
  jsonString += "]}";
  
  return jsonString;
}

// Keeping all the data and writing is expencive process. So that, I tried partial writing.
// First keep all the data of one line, then write it to file and repeat.
// This function have better performance, but no frame count limitation.
function writePixelDataJSON(noiseData) {
  const width = noiseData.width;
  const height = noiseData.height;
  const len = noiseData.data.length;
  let jsonString = '{"resolution":'+info.infoResolutionString+' "data":[';
  appendJSON(jsonString);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let color = noiseData.data[x * y + 3] > 0 ? "black" : "white";
      jsonString += '{"x":' + x + ',"y":' + y + ',"color":"' + color + '"},';
    }
    appendJSON(jsonString);
    jsonString = '';
  }
  jsonString += "]}";
  appendJSON(jsonString);
}


async function addFrameArray(noiseData, frameDataArray) {
  await formatPixelDataAsObject(noiseData)
    .then(formattedData => {
      frameDataArray.push(formattedData);
    }).then(writeJSON(JSON.stringify(frameDataArray)));

}


async function appendJSON(content) {
  const fs = require('fs').promises;
  try {
    await fs.appendFile('logs.json', content)
  }
  catch (error) {
    console.error(error);
  }
}

async function writeJSON(content) {
  const fs = require('fs').promises;
  try {
    await fs.writeFile('logs.json', content)
  }
  catch (error) {
    console.error(error);
  }
}

