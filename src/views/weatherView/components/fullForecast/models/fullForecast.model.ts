interface ITemperatureModel {
  Value: number;
  Unit: string;
}

export interface IDailyForecastsModel {
  Date: string;
  Day: {
    IconPhrase: string;
  };
  Temperature: {
    Maximum: ITemperatureModel;
    Minimum: ITemperatureModel;
  };
}

export interface IAxiosDailyForecastsModel {
  DailyForecasts: IDailyForecastsModel[];
}