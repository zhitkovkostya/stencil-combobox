export default { title: 'Button' };

export const defaultComponent = () => {
  let buttonElement = document.createElement('my-button');

  buttonElement.text = 'Button';

  return buttonElement;
};
