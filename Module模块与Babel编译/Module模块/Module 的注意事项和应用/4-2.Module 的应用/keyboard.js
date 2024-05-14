import { LEFT_KEYCODE, RIGHT_KEYCODE } from './constants.js';

const keyboard = {
  bindEvent(slider) {
    document.addEventListener(
      'keyup',
      ev => {
        if (ev.keyCode === LEFT_KEYCODE) {
          slider.prev();
        } else if (ev.keyCode === RIGHT_KEYCODE) {
          slider.next();
        }
      },
      false
    );
  }
};

// 定义了一个名为keyboard的对象，该对象有一个名为bindEvent的方法。然后，它将keyboard对象作为默认导出。
// export default keyboard;

// 为了让代码更加清晰，我们可以将keyboard对象的默认导出放到对象字面量中，这样就不需要再定义keyboard对象了。
export default {
  bindEvent(slider) {
    document.addEventListener(
      'keyup',
      ev => {
        if (ev.keyCode === LEFT_KEYCODE) {
          slider.prev();
        } else if (ev.keyCode === RIGHT_KEYCODE) {
          slider.next();
        }
      },
      false
    );
  }
}
