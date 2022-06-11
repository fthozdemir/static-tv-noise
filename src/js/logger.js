let FrameData = {
  length: 0,
  data: [],
  // resolution = info.width + "x" + info.height;
  push(element) {
    this.data[this.length] = element;
    this.length++;
  },
};
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
      if (this.head >= this.size) this.head = 0;
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

function reFormatPixelData(noiseData) {
  var w = 0;
  var x = 0;
  var len = noiseData.data.length;
  for (let i = 0; i < len; i += 4) {
    var y = w;
    var color = noiseData.data[i + 3] > 0 ? "black" : "white";
    frameData.push({ x: x, y: y, color: color });
    w += 1;
    if (w > info.height) {
      w = 0;
      x++;
    }
  }
  return frameData;
}

function reFormatPixelDataJSON(noiseData) {
  var w = 0;
  var x = 0;
  const len = noiseData.data.length;
  var jsonString = '{"resolution":"1920x1080" data":[';
  for (let i = 0; i < len; i += 4) {
    var y = w;
    var color = noiseData.data[i + 3] > 0 ? "black" : "white";
    jsonString += '{"x":' + x + ',"y":' + y + ',"color":' + color + "},";
    w += 1;
    if (w > info.height) {
      w = 0;
      x++;
    }
  }
  jsonString += "]}";
  return jsonString;
}

function addFrameArray(noiseData, frameDataArray) {
  //frameDataArray.push(reFormatPixelDataJSON(noiseData));
  //frameDataArray.push(reFormatPixelData(noiseData));
}

function toStringFrameArray(frameDataArray) {
  return JSON.stringify(frameDataArray.popAll());
}
