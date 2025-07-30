import {
  mergeSortR,
  mergeSortB,
  mergeSortG,
  mergeSortH,
  mergeSortS,
  mergeSortL,
} from "./mergeUtils";

var canvas,
  ctx,
  imageData,
  pixels = null;
var bgColor = [255, 255, 255];

function initializePixelList(canvasRef) {
  console.log("initializing pixel data");
  canvas = canvasRef;
  ctx = canvas.getContext("2d", { willReadFrequently: true });
  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  pixels = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    if (imageData.data[i + 3] != 0) {
      const pixel = {
        r: imageData.data[i],
        g: imageData.data[i + 1],
        b: imageData.data[i + 2],
      };
      pixels.push(pixel);
    }
  }
}

function compressIntoSquare(ratio) {
  console.log("compressing image into square");
  const newWidth = Math.floor(Math.sqrt(pixels.length) * ratio);
  const newHeight = Math.ceil(newWidth / ratio);

  canvas.width = newWidth;
  canvas.height = newHeight;
  ctx.canvas.width = newWidth;
  ctx.canvas.height = newHeight;
  if (pixels.length < newWidth * newHeight) {
    // add missing pixels to fill in square
    const pixelsToAdd = newWidth * newHeight - pixels.length;
    console.log("adding " + pixelsToAdd + " pixels");
    for (let i = 0; i < pixelsToAdd; i++) {
      pixels.push({ r: bgColor[0], g: bgColor[1], b: bgColor[2] });
    }
  }
  if (pixels.length > newWidth * newHeight) {
    console.log(pixels.length - newWidth * newHeight + " pixels removed");
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function horizontalSort(option) {
  console.log("Sorting rows by: " + option)
  const rows = [];

  for (let x = 0; x < pixels.length; x += canvas.width) {
    const row = pixels.slice(x, x + canvas.width);
    rows.push(row);
  }

  const newRows = [];
  rows.forEach((row) => {
    let newRow = [];
    if (option === "l") {
      newRow = mergeSortL(row);
    } else if (option === "h") {
      newRow = mergeSortH(row);
    } else if (option === "s") {
      newRow = mergeSortS(row);
    } else if (option === "r") {
      newRow = mergeSortR(row);
    } else if (option === "g") {
      newRow = mergeSortG(row);
    } else if (option === "b") {
      newRow = mergeSortB(row);
    } else {
      newRow = shuffle(row);
    }
    newRows.push(newRow);
  });

  // replace pixel array with these rows
  pixels = [];
  newRows.forEach((row) => {
    pixels = pixels.concat(row);
  });
}

function verticalSort(option) {
  console.log("Sorting columns by: " + option)
  const columns = [];

  for (let x = 0; x < canvas.width; x++) {
    const column = [];
    for (let y = 0; y < canvas.height; y++) {
      column.push(pixels[canvas.width * y + x]);
    }
    columns.push(column);
  }

  const newColumns = [];
  columns.forEach((column) => {
    let newColumn = [];
    if (option === "l") {
      newColumn = mergeSortL(column);
    } else if (option === "h") {
      newColumn = mergeSortH(column);
    } else if (option === "s") {
      newColumn = mergeSortS(column);
    } else if (option === "r") {
      newColumn = mergeSortR(column);
    } else if (option === "g") {
      newColumn = mergeSortG(column);
    } else if (option === "b") {
      newColumn = mergeSortB(column);
    } else {
      newColumn = shuffle(column);
    }
    newColumns.push(newColumn);
  });

  // replace pixel array with these columns
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      pixels[canvas.width * y + x] = newColumns[x][y];
    }
  }
}

function redraw() {
  console.log("Redrawing canvas from pixel array")
  const newImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < pixels.length; i++) {
    const pixel = pixels[i];
    newImageData.data[i * 4] = pixel.r;
    newImageData.data[i * 4 + 1] = pixel.g;
    newImageData.data[i * 4 + 2] = pixel.b;
    newImageData.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(newImageData, 0, 0);
}

export async function sort(canvasRef, rand, steps, lwRatio) {
  initializePixelList(canvasRef);
  // find a way to make this optional (if it happened in randomize step it doesn't need to happen again)
  compressIntoSquare(lwRatio);

  if (rand) {
    console.log("randomizing pixels before sorting");
    pixels = shuffle(pixels);
  }

  steps.forEach((step) => {
    if (step.direction == "horiz") {
      horizontalSort(step.option);
    } else {
      verticalSort(step.option);
    }
  });

  redraw();
  return canvas.toDataURL();
}
