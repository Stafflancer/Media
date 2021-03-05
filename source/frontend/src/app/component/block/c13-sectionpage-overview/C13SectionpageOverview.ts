import axios, { AxiosResponse } from 'axios';
import { TimelineMax, TweenMax } from 'gsap';
import { renderItem } from 'muban-core/lib/utils/dataUtils';
import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C13SectionpageOverviewTransitionController from './C13SectionpageOverviewTransitionController';
import { handleTimelineProgress, timeline } from './helpers/timelines';
import sectionItemTemplate from '../../layout/overview-item/overview-item.hbs?include';
import customSelect from '../../form-elements/custom-select/custom-select.hbs?include';
import { ContentProps, FilterPops, FilterProps, ResponseData } from './interfaces';

export default class C13SectionpageOverview extends AbstractTransitionBlock {
  public static displayName: string = 'c13-sectionpage-overview';
  private static isActive: string = 'is-active';
  private static listItem: string = 'list-item';
  private static limit: number = 10;
  private loadedData: ResponseData | null = null;
  private pageIndex: number = 0;
  private endPoint: string = this.element.dataset.endpoint!;
  private filtersState: boolean = false;
  private cardsTotalState: boolean = false;
  private filterTimeline: TimelineMax | undefined;
  private readonly loaderTimeline: TimelineMax = timeline(this.getElement('[data-spinner]'));
  private readonly cardsTotalTimeline: TimelineMax = timeline(
    this.getElement('[data-cards-total]'),
  );
  private searchSubmit: HTMLButtonElement = this.getElement('[data-search-button]');
  private itemsContainer: HTMLDivElement = this.getElement('[data-items-container]');
  private overviewList: HTMLElement = this.getElement('[data-overview-list]');
  private searchField: HTMLInputElement = this.getElement('.search-field');
  private filterWrapper: HTMLElement = this.getElement('[data-filter-wrapper]');
  private loadMoreButton: HTMLAnchorElement = this.getElement('[data-load-more]');
  private readonly loadMoreButtonTimeline: TimelineMax = timeline(this.loadMoreButton);

  constructor(el: HTMLElement) {
    super(el);
    this.transitionController = new C13SectionpageOverviewTransitionController(this);
    this.loadMoreButton.addEventListener('click', this.handleLoadMoreButtonClick);
    this.searchSubmit.addEventListener('click', this.handleSearchSubmitButton);
    this.searchField.addEventListener('focus', this.handleSearchFieldFocus);
    this.searchField.addEventListener('blur', this.handleSearchFieldBlur);
    this.loadItems();
  }

  private handleSearchFieldFocus = (): void => {
    window.addEventListener('keypress', this.handleKeyPress);
  };

  private handleSearchFieldBlur = (): void => {
    window.removeEventListener('keypress', this.handleKeyPress);
  };

  private handleKeyPress = (event: KeyboardEvent): void => {
    if (event.key !== 'Enter') return;
    this.resetResults();
  };

  private loadItems = (): void => {
    this.showLoader();
    axios
      .get(this.apiUri())
      .then(this.handleDataLoaded)
      .catch(this.handleError);
  };

  private getFilters = (): string => {
    return this.getElements('[data-filter]')
      .map(filter => {
        if (!(<HTMLSelectElement>filter).value) return;
        return `&${filter.dataset.filter}=${(<HTMLSelectElement>filter).value.toLowerCase()}`;
      })
      .join('');
  };

  private apiUri = (): string => {
    const query: string = (<HTMLInputElement>this.searchField).value;
    return `${this.endPoint}&page=${this.pageIndex}&limit=${
      C13SectionpageOverview.limit
    }&q=${query}${this.getFilters()}`;
  };

  private handleError = (): void => {};

  private handleDataLoaded = (response: AxiosResponse): void => {
    this.loadedData = response.data;
    this.setupFilters();
    this.setCardsTotal();
    this.hideLoader();
    this.addContent();
    this.openDrawer();
    this.setLoadMoreButtonState();
  };

  private addContent = (): void => {
    const loadedItems = this.loadedData && this.loadedData.content;
    const items = (<Array<any>>(<unknown>loadedItems)).filter(
      (item, index) => index < C13SectionpageOverview.limit,
    );
    items.forEach(item => this.renderOverviewItem(item));
  };

  private renderOverviewItem = (item: ContentProps): void => {
    const element = document.createElement('li');
    element.classList.add(C13SectionpageOverview.listItem);
    renderItem(element, sectionItemTemplate, this.transformCardData(item));
    this.overviewList.append(element);
  };

  private transformCardData = (data: ContentProps) => {
    const { visual, category, title, cta } = data;
    return {
      visual,
      label: category.copy,
      link: {
        href: cta.href,
        title: cta.title,
      },
      title: {
        type: 'h3',
        copy: title.copy,
      },
    };
  };

  private setCardsTotal = (): void => {
    if (this.cardsTotalState) return;
    const total = this.loadedData!.cardsCount ? this.loadedData!.cardsCount : 0;
    this.getElement('[data-section-total]').innerText = `${total}`;
    this.cardsTotalState = true;
    this.showCardsTotal();
  };

  private setupFilters = (): void => {
    if (this.filtersState) return;
    const filters: FilterProps = this.loadedData!.filters;
    if (filters.length === 0) return;
    this.filterTimeline = timeline(this.filterWrapper);
    filters.forEach(filter => {
      const element = document.createElement('div');
      element.classList.add('select-wrapper');
      this.filterWrapper.append(element);
      this.createFilters(filter, element);
    });
    this.filtersState = true;
    this.showFilters();
  };

  private createFilters = (filterData: FilterPops, element: HTMLElement): void => {
    renderItem(element, customSelect, {});
    const filter = <HTMLSelectElement>element.querySelector('select');
    filter.parentElement!.classList.add(C13SectionpageOverview.isActive);
    filter.setAttribute('data-filter', `${filterData.machine_name.toLowerCase()}`);
    this.addFilterOptions(filter, filterData);
    filter.addEventListener('change', this.handleFilterChange);
  };

  private handleFilterChange = (): void => {
    this.resetResults();
  };

  private handleSearchSubmitButton = (): void => {
    this.resetResults();
  };

  private resetResults = (): void => {
    this.closeDrawer().then(() => {
      this.overviewList.innerHTML = '';
      this.loadItems();
    });
  };

  private handleLoadMoreButtonClick = (event: Event): void => {
    event.preventDefault();
    this.pageIndex += 1;
    this.loadItems();
  };

  private addFilterOptions = (element: HTMLSelectElement, filterData: FilterPops): void => {
    element.appendChild(this.getOption(element, filterData.label, ''));
    filterData.values.forEach(filter =>
      element.appendChild(this.getOption(element, filter.label, filter.value)),
    );
  };

  private getOption = (element: HTMLElement, label: string, value: string): HTMLOptionElement => {
    const option = document.createElement('option');
    option.value = value;
    option.innerText = label;
    return option;
  };

  private setLoadMoreButtonState = (): void => {
    this.loadedData!.content.length >= C13SectionpageOverview.limit
      ? this.showLoadMoreButton()
      : this.hideLoadMoreButton();
  };

  private openDrawer = (): void => {
    const drawer = this.itemsContainer;
    const height = drawer.getBoundingClientRect().height;
    TweenMax.set(drawer, { height: 'auto' });
    TweenMax.from(drawer, 1, {
      height,
      onComplete: this.setDrawerHeight,
    });
  };

  private setDrawerHeight = (): void => {
    const drawer = this.itemsContainer;
    drawer.style.height = `${drawer.getBoundingClientRect().height}px`;
  };

  private closeDrawer = (): Promise<void> => {
    return new Promise(resolve =>
      TweenMax.to(this.itemsContainer, 1, {
        height: 0,
        onComplete: resolve,
      }),
    );
  };

  private showFilters = (): void => handleTimelineProgress(this.filterTimeline!, true);

  private showLoader = (): void => handleTimelineProgress(this.loaderTimeline, true);

  private hideLoader = (): void => handleTimelineProgress(this.loaderTimeline, false);

  private showCardsTotal = (): void => handleTimelineProgress(this.cardsTotalTimeline, true);

  private showLoadMoreButton = (): void =>
    handleTimelineProgress(this.loadMoreButtonTimeline, true);

  private hideLoadMoreButton = (): void =>
    handleTimelineProgress(this.loadMoreButtonTimeline, false);

  public dispose() {
    super.dispose();
  }
}
