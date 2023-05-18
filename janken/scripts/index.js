const getRandomCard = () => {
  const rand = Math.random()
  if (rand < 1 / 3) {
    return 'gu'
  } else if (rand < 2 / 3) {
    return 'choki'
  } else {
    return 'pa'
  }
}

const getBattleResult = (playerCard, computerCard) => {
  const cardNum = {
    gu: 0,
    choki: 1,
    pa: 2
  }
  const playerCardNum = cardNum[playerCard]
  const computerCardNum = cardNum[computerCard]
  switch ((playerCardNum + 3 - computerCardNum) % 3) {
    case 0:
      return 'あいこ'
    case 1:
      return '負け'
    case 2:
      return '勝ち'
    default:
      throw Error()
  }
}

const handleClick = (playerCard) => {
  const computerCard = getRandomCard()
  document.getElementById('computer-img').src = `images/janken_${computerCard}.png`


  const result = getBattleResult(playerCard, computerCard)
  document.getElementById('battle-result').innerText = result
}

console.log(getBattleResult('gu', 'pa'))