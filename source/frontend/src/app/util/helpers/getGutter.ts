export const getGutter = (): number =>
  parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gutter'));
