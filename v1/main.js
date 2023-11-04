import {
  hexToHSL,
  copyhexCode,
  displayHexCode,
  rgbToHex,
  filterRGBColor,
  splitComa,
  filterAnythingButNumbers,
  createGrid,
} from "./modules/utils.js";
import Palette from "./modules/palette.js";

let colorDisplayer = document.querySelector(".colorDisplayer");
let textColorInput = document.querySelector("#textColorInput");
let paletteByLuminance = document.querySelector(".paletteByLuminance");
let paletteByLuminanceDivs = paletteByLuminance.childNodes;
let colorPicker = document.querySelector('#colorPicker')
let paletteNameInput = document.querySelector('#palette-name')
let paletteParamsSubmit = document.querySelector('#submit-palette-params')

let variationsInput = document.querySelector('#variations')
variationsInput.addEventListener('input', variationsInputReader, false)
variationsInput.addEventListener('change', variationsInputReader, false)

function variationsInputReader(){
  let rawValue = variationsInput.value
  rawValue = filterAnythingButNumbers(rawValue)
  let variationsArray = splitComa(rawValue)
  console.warn(variationsArray)
  return variationsArray
}

function paletteNameInputReader(){
  let paletteName = paletteNameInput.value
  console.warn(paletteName)
  return paletteName
}

function textColorInputValueReader(e) {
  let textColorInputValue = textColorInput.value.replace("#", "");
  return textColorInputValue
}

function createPalette(){
  console.log("createPalette")
  let paletteName = paletteNameInputReader()
  console.log(paletteName)
  let variationsArray = variationsInputReader()
  console.log(variationsArray)
  let mainColor = textColorInputValueReader()
  console.log(mainColor)
  let newPalette = new Palette(paletteName, variationsArray)
  console.log(newPalette)
  newPalette.generatePalette()
  newPalette.generateBoard()
  newPalette.generateGrid()
  newPalette.paintHSLGrid(mainColor)
  console.log(newPalette)
}

function removePalette(e){
  console.warn("removePalette")
  console.log(e)
  console.log(this)
}

function paletteParamsSubmitHandler(e){
  e.preventDefault()
console.log(e)
}

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
colorPicker.addEventListener("input", colorPickerValueReader, false)
colorPicker.addEventListener("change", colorPickerValueReader, false)
paletteNameInput.addEventListener('input', paletteNameInputReader, false)
paletteNameInput.addEventListener('change', paletteNameInputReader, false)
paletteParamsSubmit.addEventListener('click', createPalette, false)


function colorPickerValueReader(e){
  console.log("colorPickerValueReader")
  console.log(this)
  console.log(this.value)
  console.log(e)
  console.log(e.srcElement.value)
  let pickedColor = e.srcElement.value
}

// createGrid("test de mon cul", [0, 1, 2, 3]);

// let paletteByLuminance2 = new Palette(
//   "paletteByLuminance",
//   [0, 5, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 95, 97, 98, 99, 100]
// );

// let COINCOIN = new Palette(
//   "AAAAAAAA",
//   [0, 60, 70, 80, 90, 95, 97, 98, 99, 100]
// );

// paletteByLuminance2.generatePalette()
// paletteByLuminance2.generateBoard()
// paletteByLuminance2.generateGrid()
// paletteByLuminance2.paintHSLGrid('#123456')

// COINCOIN.generatePalette()
// COINCOIN.generateBoard()
// COINCOIN.generateGrid()
// COINCOIN.paintHSLGrid('#123456')


