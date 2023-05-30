const FIELD_SIZE_VERTICAL = 8
const FIELD_SIZE_HORIZONTAL = 8
const INIT_WHITE_LOCATIONS = [
  {
    vertical: 3,
    horizontal: 3
  },
  {
    vertical: 4,
    horizontal: 4
  },
]
const INIT_BLACK_LOCATIONS = [
  {
    vertical: 4,
    horizontal: 3
  },
  {
    vertical: 3,
    horizontal: 4
  },
]


class Reversi {
  // stage: 盤面。0, 1, 2は「それぞれ置かれていない」、「白が置かれている」、「黒が置かれている」をそれぞれ表す。
  // latestStone: 最後に置かれた石。初期値はundefinedで、setStoneで更新する。
  constructor() {
    this.stage = [...Array(FIELD_SIZE_VERTICAL)]
      .map(() => [...Array(FIELD_SIZE_HORIZONTAL)]
        .map(() => 0))
    for (const loc of INIT_WHITE_LOCATIONS) {
      this.stage[loc.vertical][loc.horizontal] = 1
    }
    for (const loc of INIT_BLACK_LOCATIONS) {
      this.stage[loc.vertical][loc.horizontal] = 2
    }
    this.latestStone = {
      playerNum: undefined,
      loc: {
        vertical: undefined,
        horizontal: undefined
      }
    }
  }

  setStone(playerNum, loc) {
    console.assert(loc instanceof Array)
    console.assert(0 <= loc.vertical < FIELD_SIZE_VERTICAL)
    console.assert(0 <= loc.horizontal < FIELD_SIZE_HORIZONTAL)
    console.assert(playerNum === 1 || playerNum === 2)
    console.assert(this.stage[loc.vertical][loc.horizontal] === 0)
    this.stage[loc.vertical][loc.horizontal] = playerNum
    this.latestStone = {loc, playerNum}
  }

  searchReversibleStoneLocs() {
    console.assert(this.latestStone.playerNum !== undefined)
    console.assert(this.latestStone.loc.vertical !== undefined)
    console.assert(this.latestStone.loc.horizontal !== undefined)
    const reversibleStoneLocs = []
    // 右方向に走査
    for (let h = this.latestStone.loc.horizontal + 1; h < FIELD_SIZE_HORIZONTAL; h++) {
      const searchedStone = this.stage[this.latestStone.loc.vertical][h]
      if (searchedStone === 0 || searchedStone === this.latestStone.playerNum) {
        break
      } else {
        reversibleStoneLocs.push({vertical: this.latestStone.loc.vertical, horizontal: h})
      }
    }
    // 左方向に走査
    for (let h = this.latestStone.loc.horizontal + 1; h >= 0; h--) {
      const searchedStone = this.stage[this.latestStone.loc.vertical][h]
      if (searchedStone === 0 || searchedStone === this.latestStone.playerNum) {
        break
      }
      {
        reversibleStoneLocs.push({vertical: this.latestStone.loc.vertical, horizontal: h})
      }
    }
    // 下方向に走査
    for (let v = this.latestStone.loc.vertical + 1; v < FIELD_SIZE_VERTICAL; v++) {
      const searchedStone = this.stage[v][this.latestStone.loc.horizontal]
      if (searchedStone === 0 || searchedStone === this.latestStone.playerNum) {
        break
      } else {
        reversibleStoneLocs.push({vertical: v, horizontal: this.latestStone.loc.horizontal})
      }
    }
    // 上方向に走査
    for (let v = this.latestStone.loc.vertical + 1; v >= 0; v--) {
      const searchedStone = this.stage[v][this.latestStone.loc.horizontal]
      if (searchedStone === 0 || searchedStone === this.latestStone.playerNum) {
        break
      }
      {
        reversibleStoneLocs.push({vertical: v, horizontal: this.latestStone.loc.horizontal})
      }
    }

    // 右下に走査
    let offset = 0
    while (this.latestStone.loc.vertical + offset < FIELD_SIZE_VERTICAL && this.latestStone.loc.horizontal + offset < FIELD_SIZE_HORIZONTAL) {
      const searchedStone = this.stage[this.latestStone.loc.vertical + offset][this.latestStone.loc.horizontal + offset]
      if (searchedStone === 0 || searchedStone === this.latestStone.playerNum) {
        break
      }
      {
        reversibleStoneLocs.push({
          vertical: this.latestStone.loc.vertical + offset,
          horizontal: this.latestStone.loc.horizontal + offset
        })
      }
      offset++
    }
    // 左上に走査
    offset = 0
    while (this.latestStone.loc.vertical - offset >= 0 && this.latestStone.loc.horizontal - offset >= 0) {
      const searchedStone = this.stage[this.latestStone.loc.vertical - offset][this.latestStone.loc.horizontal - offset]
      if (searchedStone === 0 || searchedStone === this.latestStone.playerNum) {
        break
      }
      {
        reversibleStoneLocs.push({
          vertical: this.latestStone.loc.vertical - offset,
          horizontal: this.latestStone.loc.horizontal - offset
        })
      }
      offset++
    }
    // 左下に走査
    offset = 0
    while (this.latestStone.loc.vertical + offset < FIELD_SIZE_VERTICAL && this.latestStone.loc.horizontal - offset >= 0) {
      const searchedStone = this.stage[this.latestStone.loc.vertical + offset][this.latestStone.loc.horizontal - offset]
      if (searchedStone === 0 || searchedStone === this.latestStone.playerNum) {
        break
      }
      {
        reversibleStoneLocs.push({
          vertical: this.latestStone.loc.vertical + offset,
          horizontal: this.latestStone.loc.horizontal - offset
        })
      }
      offset++
    }
    // 右上に走査
    offset = 0
    while (this.latestStone.loc.vertical - offset >= 0 && this.latestStone.loc.horizontal + offset < FIELD_SIZE_HORIZONTAL) {
      const searchedStone = this.stage[this.latestStone.loc.vertical - offset][this.latestStone.loc.horizontal + offset]
      if (searchedStone === 0 || searchedStone === this.latestStone.playerNum) {
        break
      }
      {
        reversibleStoneLocs.push({
          vertical: this.latestStone.loc.vertical - offset,
          horizontal: this.latestStone.loc.horizontal + offset
        })
      }
      offset++
    }

    return reversibleStoneLocs
  }

  reverse() {
    const reversibleStoneLocs = this.searchReversibleStoneLocs()
    for (const loc of reversibleStoneLocs){
      this.stage[loc.vertical][loc.horizontal] = this.latestStone.playerNum
    }
  }

  renderStage(){
    const cellRowContainer = document.getElementById('cell-row-container')
    for (let v = 0; v < FIELD_SIZE_VERTICAL; v++)  {
      const cellRow = document.createElement('div')
      cellRow.className = 'flex'
      for (let h = 0; h < FIELD_SIZE_HORIZONTAL; h++) {
        const cell = document.createElement('div')
        cell.className = 'cell'
        const stoneImg = document.createElement('img')
        if (this.stage[v][h] === 1){
          stoneImg.src = 'images/game_reversi_white.png'
        } else if (this.stage[v][h] === 2) {
          stoneImg.src = 'images/game_reversi_black.png'
        }
        cell.appendChild(stoneImg)
        cellRow.appendChild(cell)
      }
      cellRowContainer.appendChild(cellRow)
    }
  }



  mainLoop(){

  }
}

const field = new Reversi()


window.addEventListener('load', () => {
  field.renderStage()
})
