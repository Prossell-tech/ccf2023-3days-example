const HIGHLIGHT_AVAILABLE_CELL = true
const COMPUTER_AWAIT_MS = 500
const PLAYER_STONE = 2  // 1: 白、 2: 黒
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

const getRandInt = (max) => Math.floor(Math.random() * max)
const flip1and2 = (input) => {
  if (input === 1) return 2
  if (input === 2) return 1
}


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
    this.isProcessing = false
  }

  canSetStone(playerNum, loc) {
    const isVerticalOk = 0 <= loc.vertical && loc.vertical < FIELD_SIZE_VERTICAL
    const isHorizontalOk = 0 <= loc.horizontal && loc.horizontal < FIELD_SIZE_HORIZONTAL
    const isPlayerNumOk = playerNum === 1 || playerNum === 2
    const isAlreadyExists = this.stage[loc.vertical][loc.horizontal] !== 0
    const canReverse = this.searchReversibleStoneLocs(playerNum, loc).length !== 0
    return isVerticalOk && isHorizontalOk && isPlayerNumOk && !isAlreadyExists && canReverse
  }

  setStone(playerNum, loc) {
    console.assert(this.canSetStone(playerNum, loc))
    this.stage[loc.vertical][loc.horizontal] = playerNum
    this.latestStone = {loc, playerNum}
  }

  searchReversibleStoneLocs(playerNum = this.latestStone.playerNum, loc = this.latestStone.loc) {
    console.assert(playerNum !== undefined)
    console.assert(loc.vertical !== undefined)
    console.assert(loc.horizontal !== undefined)
    const reversibleStoneLocs = []
    // 右方向に走査
    let hasFoundEnemyStone = false
    let searchedLocsPerLine = []
    for (let h = loc.horizontal + 1; h < FIELD_SIZE_HORIZONTAL; h++) {
      const searchedStone = this.stage[loc.vertical][h]
      if (!hasFoundEnemyStone) {
        const isEnemyStone = searchedStone !== 0 && searchedStone !== playerNum
        if (isEnemyStone) {
          hasFoundEnemyStone = true
          searchedLocsPerLine.push({vertical: loc.vertical, horizontal: h})
        } else {
          break
        }
      } else {
        if (searchedStone === 0) {
          // 何も置かれていなかったら
          break
        } else if (searchedStone === playerNum) {
          // 自分の色だったら
          reversibleStoneLocs.push(...searchedLocsPerLine)
          break
        } else {
          // 敵の色だったら
          searchedLocsPerLine.push({vertical: loc.vertical, horizontal: h})
        }
      }
    }
    // 左方向に走査
    hasFoundEnemyStone = false
    searchedLocsPerLine = []
    for (let h = loc.horizontal - 1; h >= 0; h--) {
      const searchedStone = this.stage[loc.vertical][h]
      if (!hasFoundEnemyStone) {
        const isEnemyStone = searchedStone !== 0 && searchedStone !== playerNum
        if (isEnemyStone) {
          hasFoundEnemyStone = true
          searchedLocsPerLine.push({vertical: loc.vertical, horizontal: h})
        } else {
          break
        }
      } else {
        if (searchedStone === 0) {
          // 何も置かれていなかったら
          break
        } else if (searchedStone === playerNum) {
          // 自分の色だったら
          reversibleStoneLocs.push(...searchedLocsPerLine)
          break
        } else {
          // 敵の色だったら
          searchedLocsPerLine.push({vertical: loc.vertical, horizontal: h})
        }
      }
    }
    // 下方向に走査
    hasFoundEnemyStone = false
    searchedLocsPerLine = []
    for (let v = loc.vertical + 1; v < FIELD_SIZE_VERTICAL; v++) {
      const searchedStone = this.stage[v][loc.horizontal]
      if (!hasFoundEnemyStone) {
        const isEnemyStone = searchedStone !== 0 && searchedStone !== playerNum
        if (isEnemyStone) {
          hasFoundEnemyStone = true
          searchedLocsPerLine.push({vertical: v, horizontal: loc.horizontal})
        } else {
          break
        }
      } else {
        if (searchedStone === 0) {
          // 何も置かれていなかったら
          break
        } else if (searchedStone === playerNum) {
          // 自分の色だったら
          reversibleStoneLocs.push(...searchedLocsPerLine)
          break
        } else {
          // 敵の色だったら
          searchedLocsPerLine.push({vertical: v, horizontal: loc.horizontal})
        }
      }
    }
    // 上方向に走査
    hasFoundEnemyStone = false
    searchedLocsPerLine = []
    for (let v = loc.vertical - 1; v >= 0; v--) {
      const searchedStone = this.stage[v][loc.horizontal]
      if (!hasFoundEnemyStone) {
        const isEnemyStone = searchedStone !== 0 && searchedStone !== playerNum
        if (isEnemyStone) {
          hasFoundEnemyStone = true
          searchedLocsPerLine.push({vertical: v, horizontal: loc.horizontal})
        } else {
          break
        }
      } else {
        if (searchedStone === 0) {
          // 何も置かれていなかったら
          break
        } else if (searchedStone === playerNum) {
          // 自分の色だったら
          reversibleStoneLocs.push(...searchedLocsPerLine)
          break
        } else {
          // 敵の色だったら
          searchedLocsPerLine.push({vertical: v, horizontal: loc.horizontal})
        }
      }
    }

    // 右下に走査
    hasFoundEnemyStone = false
    searchedLocsPerLine = []
    let offset = 1
    while (loc.vertical + offset < FIELD_SIZE_VERTICAL && loc.horizontal + offset < FIELD_SIZE_HORIZONTAL) {
      const searchedStone = this.stage[loc.vertical + offset][loc.horizontal + offset]
      if (!hasFoundEnemyStone) {
        const isEnemyStone = searchedStone !== 0 && searchedStone !== playerNum
        if (isEnemyStone) {
          hasFoundEnemyStone = true
          searchedLocsPerLine.push({
            vertical: loc.vertical + offset,
            horizontal: loc.horizontal + offset
          })
        } else {
          break
        }
      } else {
        if (searchedStone === 0) {
          // 何も置かれていなかったら
          break
        } else if (searchedStone === playerNum) {
          // 自分の色だったら
          reversibleStoneLocs.push(...searchedLocsPerLine)
          break
        } else {
          // 敵の色だったら
          searchedLocsPerLine.push({
            vertical: loc.vertical + offset,
            horizontal: loc.horizontal + offset
          })
        }
      }
      offset++
    }
    // 左上に走査
    hasFoundEnemyStone = false
    searchedLocsPerLine = []
    offset = 1
    while (loc.vertical - offset >= 0 && loc.horizontal - offset >= 0) {
      const searchedStone = this.stage[loc.vertical - offset][loc.horizontal - offset]
      if (!hasFoundEnemyStone) {
        const isEnemyStone = searchedStone !== 0 && searchedStone !== playerNum
        if (isEnemyStone) {
          hasFoundEnemyStone = true
          searchedLocsPerLine.push({
            vertical: loc.vertical - offset,
            horizontal: loc.horizontal - offset
          })
        } else {
          break
        }
      } else {
        if (searchedStone === 0) {
          // 何も置かれていなかったら
          break
        } else if (searchedStone === playerNum) {
          // 自分の色だったら
          reversibleStoneLocs.push(...searchedLocsPerLine)
          break
        } else {
          // 敵の色だったら
          searchedLocsPerLine.push({
            vertical: loc.vertical - offset,
            horizontal: loc.horizontal - offset
          })
        }
      }
      offset++
    }
    // 左下に走査
    hasFoundEnemyStone = false
    searchedLocsPerLine = []
    offset = 1
    while (loc.vertical + offset < FIELD_SIZE_VERTICAL && loc.horizontal - offset >= 0) {
      const searchedStone = this.stage[loc.vertical + offset][loc.horizontal - offset]
      if (!hasFoundEnemyStone) {
        const isEnemyStone = searchedStone !== 0 && searchedStone !== playerNum
        if (isEnemyStone) {
          hasFoundEnemyStone = true
          searchedLocsPerLine.push({
            vertical: loc.vertical + offset,
            horizontal: loc.horizontal - offset
          })
        } else {
          break
        }
      } else {
        if (searchedStone === 0) {
          // 何も置かれていなかったら
          break
        } else if (searchedStone === playerNum) {
          // 自分の色だったら
          reversibleStoneLocs.push(...searchedLocsPerLine)
          break
        } else {
          // 敵の色だったら
          searchedLocsPerLine.push({
            vertical: loc.vertical + offset,
            horizontal: loc.horizontal - offset
          })
        }
      }
      offset++
    }
    // 右上に走査
    hasFoundEnemyStone = false
    searchedLocsPerLine = []
    offset = 1
    while (loc.vertical - offset >= 0 && loc.horizontal + offset < FIELD_SIZE_HORIZONTAL) {
      const searchedStone = this.stage[loc.vertical - offset][loc.horizontal + offset]
      if (!hasFoundEnemyStone) {
        const isEnemyStone = searchedStone !== 0 && searchedStone !== playerNum
        if (isEnemyStone) {
          hasFoundEnemyStone = true
          searchedLocsPerLine.push({
            vertical: loc.vertical - offset,
            horizontal: loc.horizontal + offset
          })
        } else {
          break
        }
      } else {
        if (searchedStone === 0) {
          // 何も置かれていなかったら
          break
        } else if (searchedStone === playerNum) {
          // 自分の色だったら
          reversibleStoneLocs.push(...searchedLocsPerLine)
          break
        } else {
          // 敵の色だったら
          searchedLocsPerLine.push({
            vertical: loc.vertical - offset,
            horizontal: loc.horizontal + offset
          })
        }
      }
      offset++
    }

    return reversibleStoneLocs
  }

  reverse() {
    const reversibleStoneLocs = this.searchReversibleStoneLocs()
    for (const loc of reversibleStoneLocs) {
      this.stage[loc.vertical][loc.horizontal] = this.latestStone.playerNum
    }
  }

  canPlay(playerNum) {
    for (let v = 0; v < FIELD_SIZE_VERTICAL; v++) {
      for (let h = 0; h < FIELD_SIZE_HORIZONTAL; h++) {
        if (this.canSetStone(playerNum, {vertical: v, horizontal: h})) return true
      }
    }
    return false
  }

  getAvailableLocs(playerNum) {
    const out = []
    for (let v = 0; v < FIELD_SIZE_VERTICAL; v++) {
      for (let h = 0; h < FIELD_SIZE_HORIZONTAL; h++) {
        const loc = {vertical: v, horizontal: h}
        if (this.canSetStone(playerNum, loc)) out.push(loc)
      }
    }
    return out
  }

  playByComputer() {
    const availableLocs = this.getAvailableLocs(flip1and2(PLAYER_STONE))
    console.assert(availableLocs.length)
    const index = getRandInt(availableLocs.length)
    this.setStone(flip1and2(PLAYER_STONE), availableLocs[index])
  }

  getNumStones() {
    const out = {'1': 0, '2': 0}
    for (let v = 0; v < FIELD_SIZE_VERTICAL; v++) {
      for (let h = 0; h < FIELD_SIZE_HORIZONTAL; h++) {
        out[String(this.stage[v][h])]++
      }
    }
    return out
  }


  // ---------------------DOM操作系------------------------
  renderWinner() {
    const winnerIndicator = document.getElementById('winner-indicator')
    const numStones = this.getNumStones()
    const numPlayerStones = numStones[String(PLAYER_STONE)]
    const numComputerStones = numStones[String(flip1and2(PLAYER_STONE))]
    if (numPlayerStones === numComputerStones) {
      winnerIndicator.innerText = '引き分け'
    } else if (numPlayerStones > numComputerStones) {
      winnerIndicator.innerText = '勝者: プレイヤー'
    } else {
      winnerIndicator.innerText = '勝者: コンピュータ'
    }
  }

  emptyCellRowContainer() {
    const cellRowContainer = document.getElementById('cell-row-container')
    cellRowContainer.innerText = ''
  }

  renderStage() {
    const cellRowContainer = document.getElementById('cell-row-container')
    for (let v = 0; v < FIELD_SIZE_VERTICAL; v++) {
      const cellRow = document.createElement('div')
      cellRow.className = 'flex'
      for (let h = 0; h < FIELD_SIZE_HORIZONTAL; h++) {
        const isAvailable = this.canSetStone(PLAYER_STONE, {vertical: v, horizontal: h}) && !this.isProcessing
        const cell = document.createElement('div')
        cell.className = `cell ${isAvailable ? 'pointer' : 'not-allowed'} ${isAvailable && HIGHLIGHT_AVAILABLE_CELL ? 'highlighted-cell' : ''}`
        cell.onclick = async () => {
          if (!isAvailable) return
          this.isProcessing = true
          // 自分のターン開始
          this.setStone(PLAYER_STONE, {vertical: v, horizontal: h})
          this.reverse()
          this.emptyCellRowContainer()
          this.renderStage()

          // プレイヤーが打てず、コンピュータが打てる間、コンピュータが打ち続ける
          document.getElementById('player-indicator').innerText = 'コンピュータの番です'
          do {
            console.log('!this.canPlay(PLAYER_STONE), !this.canPlay(flip1and2(PLAYER_STONE)), this', !this.canPlay(PLAYER_STONE), !this.canPlay(flip1and2(PLAYER_STONE)), this)
            if (this.canPlay(flip1and2(PLAYER_STONE))){
              await new Promise(resolve => setTimeout(resolve, COMPUTER_AWAIT_MS));
              this.playByComputer()
              this.reverse()
              this.emptyCellRowContainer()
              this.renderStage()
            }
          } while (!this.canPlay(PLAYER_STONE) && this.canPlay(flip1and2(PLAYER_STONE)))

          // 両者打てないなら、ゲームを終了する。
          if (!this.canPlay(PLAYER_STONE) && !this.canPlay(flip1and2(PLAYER_STONE))) {
            document.getElementById('player-indicator').innerText = 'ゲーム終了'
            this.renderWinner()
          } else {
            document.getElementById('player-indicator').innerText = 'プレイヤーの番です'
            this.isProcessing = false
            this.emptyCellRowContainer()
            this.renderStage()
          }
        }
        const stoneImg = document.createElement('img')
        if (this.stage[v][h] === 1) {
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
}

const reversi = new Reversi()


window.addEventListener('load', () => {
  reversi.renderStage()
})
