import AbstractComponent from '../../AbstractComponent';
import { Model } from 'app/data/model';

export default class LanguageSelector extends AbstractComponent {
  public static readonly displayName: string = 'language-selector';
  private copy: HTMLElement = this.getElement('[data-language-copy]');

  constructor(el: HTMLElement) {
    super(el);
    this.element.addEventListener('click', this.handleLanguageSelectorClick);
    this.setLanguage();
  }

  private handleLanguageSelectorClick = (): void => {
    Model.showLanguageSelector(true);
  };

  private getLanguageName = (language: string): string => {
    let languageName;
    switch (language) {
      case 'de':
        languageName = 'Deutsch';
        break;
      case 'es':
        languageName = 'Español';
        break;
      case 'mx':
        languageName = 'Español mexicano';
        break;
      case 'fr':
        languageName = 'Français';
        break;
      case 'pt-pt':
        languageName = 'Portugues';
        break;
      case 'pt':
        languageName = 'Español puertorriqueño';
        break;
      case 'ao':
        languageName = 'Portugues de Angola';
        break;
      default:
        languageName = 'English';
    }
    return languageName;
  };

  private setLanguage = (): void => {
    this.copy.innerText = this.getLanguageName(document.documentElement.lang);
  };

  public dispose() {
    super.dispose();
  }
}
