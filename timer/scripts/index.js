class Timer {
  constructor() {
    this.indicator = '0'
  }
  renderIndicator (){
    document.getElementById('indicator').innerText = this.indicator
  }
  button0 () {
    if (this.indicator !== '0'){
      this.indicator = `${this.indicator}0`
    }
    this.renderIndicator()
  }
  button1to9 (num) {
    if (this.indicator === '0'){
      this.indicator = String(num)
    } else {
      this.indicator = `${this.indicator}${String(num)}`
    }
    this.renderIndicator()
  }
  buttonStart () {
    const interval = setInterval(() => {
      if (+this.indicator <= 0){
        alert('カウントが0になりました！')
        clearInterval(interval)
      } else {
        this.indicator--
        this.renderIndicator()
      }
    }, 1000)
  }
}


const timer = new Timer()