class PianoKey {
  constructor(freq) {
    this.freq = freq;
    this.isDown = false;
  }

  beep() {
    if (this.isDown) return;
    this.isDown = true;
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.oscillator = ctx.createOscillator();
    this.oscillator.type = "sine";
    this.oscillator.frequency.value = this.freq;
    this.oscillator.connect(ctx.destination);
    this.oscillator.start();
  }

  stop() {
    this.isDown = false;
    this.oscillator.stop();
  }
}

class Piano {
  constructor() {
    this.do = new PianoKey(440 * 2 ** (0 / 12));
    this.doS = new PianoKey(440 * 2 ** (1 / 12));
    this.re = new PianoKey(440 * 2 ** (2 / 12));
    this.reS = new PianoKey(440 * 2 ** (3 / 12));
    this.mi = new PianoKey(440 * 2 ** (4 / 12));
    this.fa = new PianoKey(440 * 2 ** (5 / 12));
    this.faS = new PianoKey(440 * 2 ** (6 / 12));
    this.so = new PianoKey(440 * 2 ** (7 / 12));
    this.soS = new PianoKey(440 * 2 ** (8 / 12));
    this.ra = new PianoKey(440 * 2 ** (9 / 12));
    this.raS = new PianoKey(440 * 2 ** (10 / 12));
    this.shi = new PianoKey(440 * 2 ** (11 / 12));
  }
}

const piano = new Piano();

// キーボードイベントリスナーを追加
window.addEventListener("keydown", (ev) => {
  switch (ev.key) {
    case "q":
      piano.do.beep();
      break;
    case "2":
      piano.doS.beep();
      break;
    case "w":
      piano.re.beep();
      break;
    case "3":
      piano.reS.beep();
      break;
    case "e":
      piano.mi.beep();
      break;
    case "r":
      piano.fa.beep();
      break;
    case "5":
      piano.faS.beep();
      break;
    case "t":
      piano.so.beep();
      break;
    case "6":
      piano.soS.beep();
      break;
    case "y":
      piano.ra.beep();
      break;
    case "7":
      piano.raS.beep();
      break;
    case "u":
      piano.shi.beep();
      break;
  }
});
window.addEventListener("keyup", (ev) => {
  switch (ev.key) {
    case "q":
      piano.do.stop();
      break;
    case "2":
      piano.doS.stop();
      break;
    case "w":
      piano.re.stop();
      break;
    case "3":
      piano.reS.stop();
      break;
    case "e":
      piano.mi.stop();
      break;
    case "r":
      piano.fa.stop();
      break;
    case "5":
      piano.faS.stop();
      break;
    case "t":
      piano.so.stop();
      break;
    case "6":
      piano.soS.stop();
      break;
    case "y":
      piano.ra.stop();
      break;
    case "7":
      piano.raS.stop();
      break;
    case "u":
      piano.shi.stop();
      break;
  }
});
