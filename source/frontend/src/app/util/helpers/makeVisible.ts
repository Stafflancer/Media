const isHidden: string = 'is-hidden';

export const makeVisible = (element: HTMLElement, className: string = isHidden) => {
  element.classList.remove(className);
};
