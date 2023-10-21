import { hexToHSL, copyhexCode, rgbToHex, filterRGBColor, splitComa } from './modules/utils.js';

let colorDisplayer = document.querySelector(".colorDisplayer");
let textColorInput = document.querySelector(".textColorInput");
let paletteByLuminance = document.querySelector(".paletteByLuminance");
let paletteByLuminanceDivs = paletteByLuminance.childNodes;

function updateColorColorDisplayer(e) {
  let textColorInputValue = textColorInput.value.replace("#", "");
  colorDisplayer.style.borderColor = "#" + textColorInputValue;
}

function updatePaletteByLuminanceDivs(e) {
  let textColorInputValue = textColorInput.value.replace("#", "");
  paletteByLuminanceDivs.forEach((item) => {
    if (item.tagName == "DIV") {
      item.innerHTML = '<h2>'+item.id+'<h2>';
      item.style.backgroundColor =
        "hsl(" + hexToHSL(textColorInputValue).h + " 100% " + item.id + "%)";
        item.addEventListener("click", copyhexCode , false)
        item.addEventListener("click", displayHexCode , false)
    }
  });
}

function displayHexCode(e){
  let currentRGBColor = filterRGBColor(e.originalTarget.style.backgroundColor)
  let currentRGBColorArray = splitComa(currentRGBColor)
  let currentCodeRGB = document.querySelector('.currentCodeRGB')
  let currentCodeHSL = document.querySelector('.currentCodeHSL')
  let currentCodeHex = document.querySelector('.currentCodeHex')
  let currentR = currentRGBColorArray[0]
  let currentG = currentRGBColorArray[1]
  let currentB = currentRGBColorArray[2]
  let currentHexColor = rgbToHex(currentR, currentG, currentB)
  let currentHSLColor = hexToHSL(currentHexColor).h+' '+hexToHSL(currentHexColor).s+'% '+hexToHSL(currentHexColor).l+'%'
  currentCodeRGB.innerHTML = 'RGB : <span style="color:red">'+currentR+'</span>,<span style="color:green">'+currentG+'</span>,<span style="color:blue">'+currentB+'</span><br>'
  currentCodeHSL.innerHTML = 'HSL : '+currentHSLColor
  currentCodeHex.innerHTML = 'HEX : '+currentHexColor
}

textColorInput.addEventListener("input", updateColorColorDisplayer, false);
textColorInput.addEventListener("input", updatePaletteByLuminanceDivs, false);
textColorInput.addEventListener("change", updateColorColorDisplayer, false);
textColorInput.addEventListener("change", updatePaletteByLuminanceDivs, false);
