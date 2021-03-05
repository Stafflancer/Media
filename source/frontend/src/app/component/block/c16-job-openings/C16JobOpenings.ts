import axios, { AxiosResponse } from 'axios';
import { TimelineMax, TweenMax, Power2 } from 'gsap';
import { renderItem } from 'muban-core/lib/utils/dataUtils';
import AbstractTransitionBlock from 'app/component/block/AbstractTransitionBlock';
import C16JobOpeningsTransitionController from './C16JobOpeningsTransitionController';
import template from '../../general/job-item/job-item.hbs?include';
import { verticalFadeIn } from '../../../util/transition-helpers';
import {utils} from "knockout";
import toggleDomNodeCssClass = utils.toggleDomNodeCssClass;

const svgContext = require.context('app/svg/icon/?inline', false, /\.svg/);

interface JobContent {
  link: string;
  title: string;
  location: string;
  department: string;
  office?: string;
}

export default class C16JobOpenings extends AbstractTransitionBlock {
  public static displayName: string = 'c16-job-openings';
  private static isActive: string = 'is-active';
  private static listItem: string = 'list-item';
  private static listItemDataAttribute = 'data-job-item';
  private static officeDataAttribute = 'data-job-office';
  private static departmentDataAttribute = 'data-job-department';
  private readonly noResultsWrapper: HTMLElement = this.getElement('[data-no-results]');
  public transitionController: C16JobOpeningsTransitionController;
  private contentIsLoaded: boolean = false;
  private jobsWrapper: HTMLElement = this.getElement('[data-jobs-wrapper]');
  private revealTransitionTimeline: TimelineMax = new TimelineMax({ paused: true });
  private jobsURI: string;
  private readonly departmentFilter: HTMLSelectElement = this.getElement(
    '[data-department-select]',
  );
  private readonly officeFilter: HTMLSelectElement = this.getElement('[data-office-select]');
  private readonly jobsElement: HTMLUListElement = this.getElement('[data-jobs-list]');
  private jobs: Array<JobContent> = [];
  private links: Array<HTMLAnchorElement> = this.getElements('[data-copy-wrapper] a');

  constructor(el: HTMLElement) {
    super(el);
    this.transitionController = new C16JobOpeningsTransitionController(this);
    this.departmentFilter &&
      this.departmentFilter.addEventListener('change', this.handleFilterChange);
    this.officeFilter && this.officeFilter.addEventListener('change', this.handleFilterChange);
    this.jobsURI = `${this.element.dataset.endpoint}`;
    this.setupLinkStyling();
    this.loadJobs();
  }

  private setupLinkStyling = (): void => {
    if (this.links.length === 0) return;
    this.links.forEach(link => {
      const text = link.innerText;
      const icon = this.createIconElement();
      const copyElement = this.createLinkElement();
      link.innerText = '';
      copyElement.innerText = text;
      link.appendChild(copyElement);
      link.appendChild(icon);
      link.classList.add('cta');
      link.classList.add('cta-chevron');
    });
  };

  private createLinkElement = (): HTMLSpanElement => {
    const span = document.createElement('span');
    span.classList.add('copy');
    return span;
  };

  private createIconElement = (): HTMLSpanElement => {
    const icon = document.createElement('span');
    icon.classList.add('icon');
    icon.innerHTML = svgContext(`./chevron.svg`);
    return icon;
  };

  private loadJobs = (): void => {
    axios
      .get(this.jobsURI)
      .then(this.handleResponse)
      .catch(() => this.noResultsWrapper.classList.add(C16JobOpenings.isActive));
  };

  private handleResponse = (response: AxiosResponse): void => {
    this.jobs = response.data.content;
    this.handleContentLoaded();
  };

  private handleFilterChange = (): void => {
    this.closeOverview();
  };


  private updateList = (): void => {
    let jobs = this.getElements('[data-job-item]');
    jobs.forEach(job => job.classList.remove(C16JobOpenings.isActive));

    if (this.departmentFilter && this.departmentFilter.value) {
      jobs = jobs.filter(job => job.dataset.jobDepartment === this.departmentFilter.value);
    }

    if (this.officeFilter && this.officeFilter.value) {
      jobs = jobs.filter(job => job.dataset.jobOffice === this.officeFilter.value);
    }

    jobs.forEach(job => job.classList.add(C16JobOpenings.isActive));
    if (jobs.length > 0) {
      this.openOverview();
      this.noResultsWrapper.classList.remove(C16JobOpenings.isActive);
    } else {
      this.noResultsWrapper.classList.add(C16JobOpenings.isActive);
    }
  };

  private closeOverview = (): void => {
    TweenMax.to(this.jobsWrapper, 0.5, {
      height: 0,
      onComplete: this.updateList,
    });
  };

  private appendJobs = (): void => {
    this.jobs.forEach(job => this.renderJobItem(job));
  };

  private renderJobItem = (jobContent: JobContent): void => {
    const element = document.createElement('li');
    element.className = C16JobOpenings.listItem;
    element.setAttribute(C16JobOpenings.listItemDataAttribute, '');
    element.setAttribute(C16JobOpenings.officeDataAttribute, jobContent.location);
    element.setAttribute(C16JobOpenings.departmentDataAttribute, jobContent.department);
    element.classList.add(C16JobOpenings.isActive);
    this.jobsElement.append(element);
    renderItem(element, template, {
      link: jobContent.link,
      title: jobContent.title,
      location: jobContent.location,
      department: jobContent.department,
    });
    this.jobsElement.append(element);
  };

  private openOverview = (): void => {
    TweenMax.set(this.jobsWrapper, { height: 'auto' });
    TweenMax.from(this.jobsWrapper, 1, {
      height: 0,
      ease: Power2.easeInOut,
    });
  };

  private handleContentLoaded = (): void => {
    this.contentIsLoaded = true;
    if (this.jobs.length === 0) {
      this.handleNoJobs();
      return;
    }
    this.appendJobs();
    this.updateFilters();
    this.openOverview();
    this.revealTransitionTimeline.add(this.revealTransition());
    this.transitionItems();
  };

  private handleNoJobs = (): void => {
    this.spinnerTransition().play();
    this.noResultsWrapper.classList.add(C16JobOpenings.isActive);
  }

  private updateFilters = (): void => {
    if (this.departmentFilter) {
      this.departmentFilter.parentElement!.classList.add(C16JobOpenings.isActive);
      const departmentFilters = this.jobs.map(job => job.department);
      this.addFilterOptions(this.departmentFilter, departmentFilters);
    }

    if (this.officeFilter) {
      this.officeFilter.parentElement!.classList.add(C16JobOpenings.isActive);
      const officeFilters = this.jobs.map(job => job.location);
      this.addFilterOptions(this.officeFilter, officeFilters);
    }
  };

  private addFilterOptions = (
    element: HTMLSelectElement,
    filters: Array<String>,
  ): void => {
    const option = document.createElement('option');
    option.value = '';
    option.innerHTML = `${element.dataset.defaultValue}`;
    element.appendChild(option);
    const uniqueFilters = [...new Set(filters)];
    uniqueFilters.forEach(filter => {
      const option = document.createElement('option');
      option.value = `${filter}`;
      option.innerHTML = `${filter}`;
      element.appendChild(option);
    });
  };

  private revealTransition = (): TimelineMax => {
    const items: Array<HTMLElement> = this.getElements('[data-job-item]');
    const timeline = new TimelineMax();
    timeline.add(this.spinnerTransition());
    timeline.add(verticalFadeIn(items));
    return timeline;
  };

  private spinnerTransition = (): TweenMax => {
    const spinner = this.getElement('[data-loader] .icon');
    return TweenMax.fromTo(
      spinner,
      0.5,
      {
        scale: 1,
        autoAlpha: 1,
      },
      {
        scale: 0,
        autoAlpha: 0,
        ease: Power2.easeIn,
      },
    );
  };

  private transitionItems = (): void => {
    const timeline = this.revealTransitionTimeline;
    TweenMax.to(timeline, timeline.duration() - timeline.time(), {
      progress: 1,
      ease: Power2.easeOut,
    });
  };
}
