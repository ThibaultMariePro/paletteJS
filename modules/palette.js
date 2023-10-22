import {
    hexToHSL,
    copyhexCode,
    displayHexCode,
    rgbToHex,
    filterRGBColor,
    splitComa,
    createGrid,
} from "./utils.js";
export default class Palette {
    constructor(name, arrayWithVariation, bgColor = "#F5F5F5") {
        this.name = name.replace(" ", "-");
        this.arrayWithVariation = arrayWithVariation;
        this.bgColor = bgColor;
        this.cellConf = {
            class: "cell",
            height: "100px",
            width: "50px",
            border: "1px solid violet",
            cursor: "pointer"
        };
        this.board = "No board generated yet"
        this.grid = "No grid generated yet"
    }

    generatePalette() {
        let palette = document.createElement("div");
        const attributes = {
            class: "palette",
            id: "palette-" + this.name,
        };
        palette.setAttribute("class", attributes.class);
        palette.setAttribute("id", attributes.id);
        document.querySelector(".lab .palettes").appendChild(palette);
        palette.innerHTML = '<h2 style="text-align:center;">' + this.name + "</h2>";
    }

    generateBoard() {
        let board = document.createElement("div");
        const attributes = {
            class: "board",
            id: "board-" + this.name,
        };
        board.setAttribute("class", attributes.class);
        board.setAttribute("id", attributes.id);

        let parentPalette = document.querySelector('#palette-' + this.name)
        parentPalette.appendChild(board);
        board.style.backgroundColor = this.bgColor;
        this.board = board;
    }

    generateGrid() {
        let grid = document.createElement("div");
        const attributes = {
            class: "grid ",
            id: "grid-" + this.name,
        };
        grid.setAttribute("class", attributes.class);
        grid.setAttribute("id", attributes.id);

        let parentBoard = document.querySelector('#board-' + this.name)
        parentBoard.appendChild(grid);

        this.arrayWithVariation.forEach((element) => {
            let cell = document.createElement("div");
            cell.setAttribute("id", element);
            cell.setAttribute("class", this.cellConf.class);
            // cell.style.height = this.cellConf.height;
            // cell.style.width = this.cellConf.width;
            // cell.style.border = this.cellConf.border;
            // cell.style.margin = this.cellConf.margin;
            cell.innerHTML =
                '<h2 style="text-shadow:10px 20px white;">' + cell.id + "</h2>";
            grid.appendChild(cell);
        });
        this.grid = grid;
    }

    paintHSLGrid(color="#FF33F5") {
        let gridToPaint = document.querySelector('#' + this.grid.id)
        console.log()
        gridToPaint.childNodes.forEach((item) => {
            item.style.backgroundColor =
                "hsl(" + hexToHSL(color).h + " 100% " + item.id + "%)";
            item.style.cursor = this.cellConf.cursor
            item.addEventListener("click", copyhexCode, false);
            item.addEventListener("click", displayHexCode, false);
        });
    }

    log() {
        console.warn('GENERATED Palette ' + this.name + ' details :');
        console.info('--- This ---');
        console.info(this);
        console.info('--- Board ---');
        console.info(this.board);
        console.info('--- Grid ---');
        console.info(this.grid);
        console.warn('----------------------------------');
    }
}
