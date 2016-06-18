// a utility function for waiting.
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const capitalizeWords = phrase => {
  return phrase
    .split(' ')
    .map(word => word[0].toUpperCase() + word.substr(1))
    .join(' ');
};
