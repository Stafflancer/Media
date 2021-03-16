import { Model } from 'app/data/model';

const openLanguageSelector = (): void => {
  Model.showLanguageSelector(true);
};

const closeLanguageSelector = (): void => {
  Model.showLanguageSelector(false);
};

export { openLanguageSelector, closeLanguageSelector };
