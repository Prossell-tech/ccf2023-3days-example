class Calculator {
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
  removeTailOperator () {
    if (this.indicator.endsWith('+') || this.indicator.endsWith('-') || this.indicator.endsWith('-') || this.indicator.endsWith('/')) {
      this.indicator = this.indicator.slice(0, this.indicator.length - 1)
    }
    this.renderIndicator()
  }
  buttonPlus () {
    this.removeTailOperator()
    this.indicator = `${this.indicator}+`
    this.renderIndicator()
  }
  buttonMinus () {
    this.removeTailOperator()
    this.indicator = `${this.indicator}-`
    this.renderIndicator()
  }
  buttonMultiply () {
    this.removeTailOperator()
    this.indicator = `${this.indicator}*`
    this.renderIndicator()
  }
  buttonDivision () {
    this.removeTailOperator()
    this.indicator = `${this.indicator}/`
    this.renderIndicator()
  }
  buttonEqual () {
    this.removeTailOperator()
    this.indicator = String(eval(this.indicator))
    this.renderIndicator()
  }
}


const calculator = new Calculator()