import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C21ContactFormTransitionController from './C21ContactFormTransitionController';

export default class C21ContactForm extends AbstractTransitionBlock {
  public static displayName: string = 'c21-contact-form';
  private static isActive: string = 'is-active';
  private formFileField: HTMLInputElement = this.getElement('.js-form-file');
  private formSubmit: HTMLInputElement = this.getElement('[data-form-submit]');
  public transitionController: C21ContactFormTransitionController;

  constructor(el: HTMLElement) {
    super(el);
    this.transitionController = new C21ContactFormTransitionController(this);
    if (this.formFileField !== null) {
      this.formFileField.addEventListener('change', this.handleFormFileFieldChange);
    }
  }

  private handleFormFileFieldChange = (e: any): void => {
    if (this.formSubmit) {
      if (e.target.files.length > 0) {
        this.formSubmit.classList.add(C21ContactForm.isActive);
      } else {
        this.formSubmit.classList.remove(C21ContactForm.isActive);
      }
    }
  };
}
