export function debounce(callback:any, wait:number) {
  let timeoutId:any = null;
  return (...args:any[]) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      // eslint-disable-next-line prefer-spread
      callback.apply(null, args);
    }, wait);
  };
}

export function throttle(callback:any, delay:number) {
  let timeout: any;
  return (...args: any[]) => {
    if (timeout !== undefined) {
      return;
    }

    timeout = setTimeout(() => {
      timeout = undefined;
    }, delay);

    return callback(...args);
  };
}
