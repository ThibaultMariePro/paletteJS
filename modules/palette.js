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
        // this.name = name.replace(" ", "-");
        this.name = name.replace(/[^a-zA-Z0-9]/g,'-');
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
        console.warn('generatePalette')
        if(document.querySelector('#palette-'+this.name)!=null){
            alert('ERROR : Cannot generate Palette, '+this.name+' name already taken.')
            throw(new Error('palette already exists for god\'s sake'))
        }
        let palette = document.createElement("div");
        let removeBtn = document.createElement("button");
        const paletteAttributes = {
            class: "palette",
            id: "palette-" + this.name,
            origin: this.name,
        };
        const removeBtnAttributes = {
            class: "removeBtn",
            id: "removeBtn-" + this.name,
            origin: this.name,
        };

        palette.setAttribute("class", paletteAttributes.class);
        palette.setAttribute("id", paletteAttributes.id);
        palette.innerHTML =
            '<div class="paletteHeader"><h2 style="text-align:center;">'
            + this.name + '</h2></div>'
        document.querySelector(".lab .palettes").appendChild(palette);

        removeBtn.setAttribute("class", removeBtnAttributes.class);
        removeBtn.setAttribute("id", removeBtnAttributes.id);
        removeBtn.innerHTML = "X"
        removeBtn.addEventListener('click', this.removePalette, false)
        palette.firstChild.appendChild(removeBtn)
    }

    removePalette() {
        let paletteName = this.id.split('removeBtn-')[1]
        console.log(paletteName)
        let palette = document.querySelector('#palette-' + paletteName)
        console.log(palette)
        palette.remove()
    }

    generateBoard() {
        let board = document.createElement("div");
        const attributes = {
            class: "board",
            id: "board-" + this.name,
            origin: this.name,
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

    paintHSLGrid(color = "#FF33F5") {
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
