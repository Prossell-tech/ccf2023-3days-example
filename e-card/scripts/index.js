const getRandInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

class ECard {
  constructor() {
    const isComputerSlave = Math.random() < 0.5
    const slaveIncludedCards =['slave', 'general', 'general', 'general', 'general']
    const emperorIncludedCards = ['emperor', 'general', 'general', 'general', 'general']
    this.computerCards = isComputerSlave ? slaveIncludedCards : emperorIncludedCards
    this.playerCards = isComputerSlave ? emperorIncludedCards : slaveIncludedCards
    this.field = {
      computer: null,
      player: null
    }
    this.winner = null
  }

  // メンバ変数ロジック系
  playCard(side, cardIdx){
    if (side === 'player'){
      const card = this.playerCards[cardIdx]
      this.field = {...this.field, player: card}
      this.playerCards = this.playerCards.filter((c, ci) => ci !== cardIdx)
    } else if (side === 'computer'){
      const card = this.computerCards[cardIdx]
      this.field = {...this.field, computer: card}
      this.computerCards = this.computerCards.filter((c, ci) => ci !== cardIdx)
    } else {
      throw Error('side should be player or computer')
    }
  }
  judgeField(){
    if (this.field.player === 'emperor'){
      this.winner = this.field.computer === 'slave' ?  'computer' : 'player'
    } else if (this.field.player === 'slave'){
      this.winner = this.field.computer === 'emperor' ? 'player' : 'computer'
    }
  }
  clearField () {
    this.field.player = null
    this.field.computer = null
  }
  async play(){
    while (this.winner === null){
      this.renderCards()
      this.playCard('computer', getRandInt(0, this.computerCards.length - 1))
      // このwhileの間に this.playCard('player', ...) が呼ばれる
      while (this.field.player === null) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      this.renderCards()
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.judgeField()
      this.clearField()
    }
    this.renderWinner()
  }

  // レンダリング系
  renderCards(){
    const computerCardsContainer = document.getElementById('computer-cards-container')
    const playerCardsContainer = document.getElementById('player-cards-container')
    const computerFieldCardContainer = document.getElementById('computer-field-card-container')
    const playerFieldCardContainer = document.getElementById('player-field-card-container')
    computerCardsContainer.innerHTML = ''
    playerCardsContainer.innerHTML = ''
    computerFieldCardContainer.innerHTML = ''
    playerFieldCardContainer.innerHTML = ''
    this.computerCards.forEach(() => {
      const cardContainer = document.createElement('div')
      const cardImg = document.createElement('img')
      cardImg.src = `images/card.png`
      cardImg.width = 100
      cardImg.height = 100
      cardContainer.appendChild(cardImg)
      computerCardsContainer.appendChild(cardContainer)
    })
    this.playerCards.forEach((card, cardIdx) => {
      const cardContainer = document.createElement('div')
      cardContainer.onclick = () => this.playCard('player', cardIdx)
      const cardImg = document.createElement('img')
      cardImg.src = `images/${card}.png`
      cardImg.width = 100
      cardImg.height = 100
      cardContainer.appendChild(cardImg)
      playerCardsContainer.appendChild(cardContainer)
    })
    const computerFieldCardImg = document.createElement('img')
    if (this.field.computer) {
      computerFieldCardImg.src = `images/${this.field.computer}.png`
    }
    computerFieldCardImg.width = 100
    computerFieldCardImg.height = 100
    computerFieldCardContainer.appendChild(computerFieldCardImg)
    const playerFieldCardImg = document.createElement('img')
    if (this.field.player) playerFieldCardImg.src = `images/${this.field.player}.png`
    playerFieldCardImg.width = 100
    playerFieldCardImg.height = 100
    playerFieldCardContainer.appendChild(playerFieldCardImg)
  }

  renderWinner () {
    document.getElementById('winner').innerText = `WINNER: ${this.winner}`
  }
}

const eCard = new ECard()
window.addEventListener('load', () => eCard.play())