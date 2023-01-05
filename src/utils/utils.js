/**
 * @desc 节流
 * @param fn 函数
 * @param interval 延迟执行毫秒数
 */
 export function throttle(fn, interval = 300) {
    let enterTime = 0; //触发的时间
    const gapTime = interval; //间隔时间，如果interval不传，则默认300ms
    return function () {
      const context = this;
      const backTime = Date.now(); //第一次函数return即触发的时间
      if (backTime - enterTime > gapTime) {
        fn.call(context, ...arguments);
        enterTime = backTime; //赋值给第一次触发的时间，这样就保存了第二次触发的时间
      }
    };
  }
  
  /**
   * @desc 防抖
   * @param fn 函数
   * @param interval 间隔毫秒数
   */
  export function debounce(fn, interval = 500) {
    let timer;
    const gapTime = interval; //间隔时间，如果interval不传，则默认500ms
    return function () {
      clearTimeout(timer);
      const context = this;
      const args = arguments; //保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
      timer = setTimeout(function () {
        fn.call(context, ...args);
      }, gapTime);
    };
  }