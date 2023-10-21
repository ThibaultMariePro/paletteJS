export default class Palette {
    constructor(name, arrayWithVariation, bgColor='#F5F5F5') {
        this.name = name;
        this.arrayWithVariation = arrayWithVariation;
        this.bgColor = bgColor
        this.cellConf = {
            class: 'cell',
            height: '100px',
            width: '50px',
            border: '1px solid violet',
            margin: '2px'
        }
    }

    generateBoard(boardName) {
        let board = document.createElement('div')
        const attributes = {
            class: 'board',
            id: boardName
        }
        board.setAttribute('class', attributes.class)
        board.setAttribute('id', attributes.id)
        document.body.appendChild(board)
        console.log(this.bgColor)
        board.style.backgroundColor = this.bgColor
        board.innerHTML = '<h2 style="text-align:center;">' + boardName + '</h2>'
        console.warn('--- generated board :')
        console.info(board)
    }

    generateGrid() {
        let grid = document.createElement('div')
        const attributes = {
            class: 'grid ',
            id: this.name
        }
        grid.setAttribute('class', attributes.class)
        grid.setAttribute('id', attributes.id)
        let lastBoard = document.querySelectorAll('.board')[document.querySelectorAll.length]
        lastBoard.appendChild(grid)
        this.arrayWithVariation.forEach(element => {
            let cell = document.createElement('div')
            cell.setAttribute('id', element)
            cell.setAttribute('class', this.cellConf.class)
            cell.style.height = this.cellConf.height
            cell.style.width = this.cellConf.width
            cell.style.border = this.cellConf.border
            cell.style.margin = this.cellConf.margin
            cell.innerHTML = '<h2 style="text-shadow:10px 10px white;">' + cell.id + '</h2>'
            grid.appendChild(cell)
        });
    }

    log() {
        console.log(this)
    }
}
// export function createGrid(name, arrayOfValue) {
//     let board = document.querySelector('.board');
//     let palette = document.createElement('div')
//     palette.setAttribute("class", "palette " + name)
//     palette.innerHTML = '<h2>'+name+'</h2>'
//     board.appendChild(palette)
//     let grid = document.createElement('div')
//     grid.setAttribute('class', 'grid')
//     palette.appendChild(grid)
//     arrayOfValue.forEach(element => {
//       let cell = document.createElement('div')
//       cell.setAttribute('id', element)
//       cell.setAttribute('class', 'cell')
//       cell.innerHTML = cell.id
//       grid.appendChild(cell)
//     });
//   }












