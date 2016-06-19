// a utility function for waiting.
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const capitalizeWords = phrase =>
  phrase
    .split(' ')
    .map(word => word[0].toUpperCase() + word.substr(1))
    .join(' ');

export const slug = string =>
  string
    .replace(/[^\w]/g, '-')
    .toLowerCase();

export const disableLandscapeMode = () => {
  // This method only works in new browsers when the app has been installed.
  // While there are hackier solutions, this feels more reasonable to me.
  const lock = screen.lockOrientation ||
               screen.mozLockOrientation ||
               screen.msLockOrientation;

  if (lock) {
    lock('portrait');
  }
};
