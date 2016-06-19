import throttle from 'lodash/throttle';


export const fluidEventWrapper = fn => {
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
};

export const scrollIntoView = el => {
  if (el.scrollIntoViewIfNeeded) {
    // Proprietary Safari/Chrome property
    el.scrollIntoViewIfNeeded();
  } else if (el.scrollIntoView) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }
};
