export const KEYS = {
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40, 

  Space: 32,

  Zero: 48,
  One: 49,
  Two: 50,
  Three: 51,
  Four: 52,
  Five: 53,
  Six: 54,
  Seven: 55,
  Eight: 56,
  Nine: 57,

  A: 65,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  Q: 81,
  R: 82,
  S: 83,
  W: 87,

  LastKeyCode: 222,
};

class InputHandler {
  #previousKeys: boolean[];
  #currentKeys: boolean[];

  constructor() {
    this.#previousKeys = [];
    this.#currentKeys = [];

    for (let i = 0; i < KEYS.LastKeyCode; ++i) {
      this.#previousKeys[i] = false;
      this.#currentKeys[i] = false;
    }
  }

  update = () => {
    for (let i = 0; i < KEYS.LastKeyCode; ++i) {
      this.#previousKeys[i] = this.#currentKeys[i];
    }
  };

  onKeyDown = (event : any) => {
    this.#currentKeys[event.keyCode] = true;
  }

  isKeyClicked = (keyCode : number) => {
    return this.#currentKeys[keyCode] && !this.#previousKeys[keyCode];
  }

  isKeyPressed = (keyCode : number) => {
    return this.#currentKeys[keyCode];
  }

  onKeyUp = (event : any) => {
    this.#currentKeys[event.keyCode] = false;
  }
}

export default InputHandler;
