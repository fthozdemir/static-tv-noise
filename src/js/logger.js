

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

//2
function reFormatPixelData(noiseData) {
  let w = 0;
  let x = 0;
  let frameData =[];
  let len = noiseData.data.length;
  for (let i = 0; i < len; i += 4) {
    let y = w;
    let color = noiseData.data[i + 3] > 0 ? "black" : "white";
    frameData.push({ x: x, y: y, color: color });
    w += 1;
    if (w > info.height) {
      w = 0;
      x++;
    }
  }
  return frameData;
}
//1
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

/*
*
* log dosyası tutmaya çalışırken bir çok yol denedim ama hata aldım. Class datası olarak tutarken(1) veya string(2) olarak tutarken memory taştı
* stringleri memoryde tutmadan yazmaya kalkışınca da (3) "too many open files" hatası
*
*/
function addFrameArray(noiseData, frameDataArray) {
  //frameDataArray.push(reFormatPixelDataJSON(noiseData));
  //frameDataArray.push(reFormatPixelData(noiseData));
  //writePixelDataJSON(noiseData);
  reFormatPixelData(noiseData);
}

function appendJSON(content)
{
  (async () => { 
    await fs.appendFile('/Users/otto/Desktop/test.json', content, err => {
      if (err) {
        console.error(err);
      }
    // file written successfully
    })
  });
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

