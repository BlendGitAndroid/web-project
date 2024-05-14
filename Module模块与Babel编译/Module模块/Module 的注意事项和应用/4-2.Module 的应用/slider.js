import BaseSlider from './base.js';
import Keyboard from './keyboard.js';
// import Mouse from './mouse.js';

class Slider extends BaseSlider {
  constructor(el, options) {
    super(el, options);
    this._bindEvent();
  }

  _bindEvent() {
    // Keyboard就是一个对象，它有一个bindEvent方法
    Keyboard.bindEvent(this);
    // Mouse.bindEvent(this);
  }
}

export default Slider;
