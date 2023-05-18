function drawCircle(context, centerX, centerY, radius) {
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  context.stroke();
}

function drawSquare(context, centerX, centerY, sideLength) {
  const halfLength = sideLength / 2;
  const x = centerX - halfLength;
  const y = centerY - halfLength;

  context.beginPath();
  context.rect(x, y, sideLength, sideLength);
  context.stroke();
}

function drawPoint(context, x, y, color) {
  context.beginPath();
  context.arc(x, y, 2, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
}

function calculatePi(numPoints) {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2 - 10;

  let pointsInsideCircle = 0;
  let pointsOutsideCircle = 0;

  function drawNextPoint() {
    if (pointsInsideCircle + pointsOutsideCircle === numPoints) {
      const approximatePi = (4 * pointsInsideCircle) / numPoints;
      document.getElementById("pi-result").innerText = "円周率の近似値: " + approximatePi;
      return;
    }

    const x = 2 * Math.random() - 1;
    const y = 2 * Math.random() - 1;

    const distance = Math.sqrt(x * x + y * y);
    const color = distance <= 1 ? "red" : "blue";

    if (distance <= 1) {
      pointsInsideCircle++;
    } else {
      pointsOutsideCircle++;
    }

    drawPoint(context, centerX + x * radius, centerY + y * radius, color);
    requestAnimationFrame(drawNextPoint);
  }

  drawNextPoint();
}

window.addEventListener("load", function() {
  // 正方形と円を描画
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2 - 10;
  drawCircle(context, centerX, centerY, radius);
  drawSquare(context, centerX, centerY, canvas.width - 20);

  // num-pointsの初期値を挿入
  document.getElementById('num-points').value = '10';

  // 「計算を開始」ボタンのonclickを定義
  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", function() {
    const numPoints = +document.getElementById('num-points').value;
    if (numPoints < 1){
      return alert('正の整数を入力してください')
    }
    console.log(numPoints)
    calculatePi(numPoints);
  });
});