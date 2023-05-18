const getRandInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

class MentalMath {
  constructor() {
    this.numbers = []
  }

  async flash() {
    this.numbers = []
    const milliSecPerNumber = (+document.getElementById('displayed-sec').value) * 1000
    const maxNumber = 10 ** (+document.getElementById('displayed-digits').value) - 1
    const numNumbers = +document.getElementById('displayed-times').value

    for (let _ = 0; _ < numNumbers; _++) {
      const num = getRandInt(1, maxNumber)
      this.numbers.push(num)
      document.getElementById('main-container').innerText = num.toString()
      await new Promise(resolve => setTimeout(resolve, milliSecPerNumber))
    }
    document.getElementById('main-container').innerText = ''
  }

  answer() {
    const num = +document.getElementById('answer').value
    const correctSum = this.numbers.reduce((prev, curr) => prev + curr, 0)
    const isCorrect = num === correctSum
    if (isCorrect) {
      alert('正解です！')
    } else {
      alert(`残念！${this.numbers.join(' + ')} = ${correctSum}でした！`)
    }
  }
}

const mentalMath = new MentalMath()