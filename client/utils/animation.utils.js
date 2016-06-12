import throttle from 'lodash/throttle';


export function fluidEventWrapper(fn) {
  let hasCompletedThisFrame = false;

  return () => {
    if (!hasCompletedThisFrame) {
      hasCompletedThisFrame = true;
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(() => {
          fn();
          hasCompletedThisFrame = false;
        });
      } else {
        throttle(fn, 16);
      }
    }
  };
}
