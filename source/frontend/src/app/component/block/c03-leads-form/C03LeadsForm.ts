import AbstractBlock from '../AbstractBlock';

export default class C03LeadsForm extends AbstractBlock {
  public static readonly displayName: string = 'c03-leads-form';

  private readonly $pageBody = document.body;
  private readonly submitBtn = this.getElement<HTMLElement>('.sure-btn');
  private readonly closeIcon = this.getElement<HTMLElement>('.c03-leads-form__content-close');
  private readonly formInputs = this.getElements<HTMLInputElement>('.form-control[type="text"]');

  private formData: any = {
    country: '1',
    companyName: '',
    userName: '',
    email: '',
  };

  constructor(el: HTMLElement) {
    super(el);

    this.closeIcon!.addEventListener('click', this.closePopup);
    for (let i = 0; i < this.formInputs.length; i++) {
      let name = this.formInputs[i].getAttribute('name') || '';
      this.formInputs[i]!.addEventListener(
        'input',
        (): void => {
          if (name !== 'leaveMessage') this.formData[name] = this.formInputs[i]!.value;
          if (Object.values(this.formData).some(v => v === '')) {
            this.submitBtn!.setAttribute('disabled', 'disable');
          } else {
            this.submitBtn!.removeAttribute('disabled');
          }
        },
      );
    }
  }

  protected closePopup = (): void => {
    this.element.style.display = 'none';
    this.$pageBody.style.overflow = 'auto';
    this.$pageBody.style.height = 'auto';
  };

  public dispose() {
    super.dispose();
  }
}
