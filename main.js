import {
  hexToHSL,
  copyhexCode,
  displayHexCode,
  rgbToHex,
  filterRGBColor,
  splitComa,
  createGrid,
} from "./modules/utils.js";
import Palette from "./modules/palette.js";

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
      item.innerHTML = "<h2>" + item.id + "<h2>";
      item.style.backgroundColor =
        "hsl(" + hexToHSL(textColorInputValue).h + " 100% " + item.id + "%)";
      item.addEventListener("click", copyhexCode, false);
      item.addEventListener("click", displayHexCode, false);
    }
  });
}


textColorInput.addEventListener("input", updateColorColorDisplayer, false);
textColorInput.addEventListener("input", updatePaletteByLuminanceDivs, false);
textColorInput.addEventListener("change", updateColorColorDisplayer, false);
textColorInput.addEventListener("change", updatePaletteByLuminanceDivs, false);



createGrid("test de mon cul", [0, 1, 2, 3]);

let paletteByLuminance2 = new Palette(
  "paletteByLuminance",
  [0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 95, 97, 98, 99, 100]
);

paletteByLuminance2.generatePalette()
paletteByLuminance2.generateBoard()
paletteByLuminance2.generateGrid()
paletteByLuminance2.paintHSLGrid('#123456')

