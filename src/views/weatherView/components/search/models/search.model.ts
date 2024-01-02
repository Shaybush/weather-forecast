export interface ISearchModel {
  key?: string;
  city?: string;
  country?: string;
}

export interface cityModel {
  currentCity: ISearchModel;
}