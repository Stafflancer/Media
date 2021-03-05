export type FilterOptionProps = {
  label: string;
  value: string;
  count: string;
  isActive: boolean;
}

export type FilterValues = Array<FilterOptionProps>

export type FilterPops = {
  label: string;
  machine_name: string;
  values: FilterValues;
}

export type FilterProps = Array<FilterPops>

type ContentVideo = {
  id: string;
  label: string;
}

type ContentVisual = {
  src: string;
  alt: string;
}

type ContentCategory = {
  type: string;
  copy: string;
}

type ContentTitle = {
  type: string;
  copy: string;
}

export type ContentProps = {
  category: ContentCategory;
  title: ContentTitle;
  visual?: ContentVisual;
  video?: ContentVideo;
  cta: any;
}

export type ResponseData = {
  filters: FilterProps
  cardsCount: string;
  content: Array<ContentProps>;
}
