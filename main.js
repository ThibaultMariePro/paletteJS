function hexToHSL(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error("Could not parse Hex Color");
  }
  const rHex = parseInt(result[1], 16);
  const gHex = parseInt(result[2], 16);
  const bHex = parseInt(result[3], 16);

  const r = rHex / 255;
  const g = gHex / 255;
  const b = bHex / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = (max + min) / 2;
  let s = h;
  let l = h;

  if (max === min) {
    // Achromatic
    return { h: 0, s: 0, l };
  }

  const d = max - min;
  s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  switch (max) {
    case r:
      h = (g - b) / d + (g < b ? 6 : 0);
      break;
    case g:
      h = (b - r) / d + 2;
      break;
    case b:
      h = (r - g) / d + 4;
      break;
  }
  h /= 6;

  s = s * 100;
  s = Math.round(s);
  l = l * 100;
  l = Math.round(l);
  h = Math.round(360 * h);

  return { h, s, l };
}

let colorDisplayer = document.querySelector(".colorDisplayer");
let textColorInput = document.querySelector(".textColorInput");
let paletteByLuminance = document.querySelector(".paletteByLuminance");
let paletteByLuminanceDivs = paletteByLuminance.childNodes;

function updateColorColorDisplayer(e) {
  console.log(e);
  let textColorInputValue = textColorInput.value.replace("#", "");

  console.log(textColorInputValue);
  console.log(hexToHSL(textColorInputValue));

  colorDisplayer.style.borderColor = "#" + textColorInputValue;
}

function rgbToHex(r, g, b){
  r = Math.abs(r).toString(16)
  g = Math.abs(g).toString(16)
  b = Math.abs(b).toString(16)
  if(r.length === 1){
    r = '0'+r;
  }
  if(g.length === 1){
    g = '0'+g;
  }
  if(b.length === 1){
    b = '0'+b;
  }
  return "#"+r+g+b
}

function copyhexCode(e){
  console.log(e)
  console.log(e.originalTarget)
  console.log(e.originalTarget.style.backgroundColor)
  let rgbColor = e.originalTarget.style.backgroundColor;
  let filteredRGBColor = rgbColor.replace(/[^0-9,]+/g, "")
  let rgbArray = filteredRGBColor.split(",")
  console.log(rgbArray)
  console.log(rgbArray[0],rgbArray[1],rgbArray[2])
  console.log(rgbToHex(rgbArray[0],rgbArray[1],rgbArray[2]))
  navigator.clipboard.writeText(rgbToHex(rgbArray[0],rgbArray[1],rgbArray[2]));
}

function updatePaletteByLuminanceDivs(e) {
  console.log(e);
  let textColorInputValue = textColorInput.value.replace("#", "");

  console.log(textColorInputValue);
  console.log(hexToHSL(textColorInputValue));

  paletteByLuminanceDivs.forEach((item) => {
    if (item.tagName == "DIV") {
      item.innerHTML = '<h2>'+item.id+'<h2>';
      item.style.backgroundColor =
        "hsl(" + hexToHSL(textColorInputValue).h + " 100% " + item.id + "%)";
        item.addEventListener("click", copyhexCode , false)
    }
  });
}

textColorInput.addEventListener("input", updateColorColorDisplayer, false);
textColorInput.addEventListener("input", updatePaletteByLuminanceDivs, false);
textColorInput.addEventListener("change", updateColorColorDisplayer, false);
textColorInput.addEventListener("change", updatePaletteByLuminanceDivs, false);
