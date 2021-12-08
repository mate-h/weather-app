/**
 * Based on docs from https://openweathermap.org/api
 */

declare module "OpenWeatherMap" {
  export type GetCurrentParams = Partial<{
    /**
     * City name, state code and country code divided by comma, use ISO 3166 country codes.
     * You can specify the parameter not only in English. In this case, the API response should be
     * returned in the same language as the language of requested location name if the location is
     * in our predefined list of more than 200,000 locations.
     */
    q: string;
    /** API key */
    appid: string;
    /** It's recommended to call the API by city ID to get unambiguous result for your city. */
    id: number;
    /** lat, lon coordinates of the location of your interest */
    lat: number;
    /** lat, lon coordinates of the location of your interest */
    lon: number;
    /** Format: {zip code},{country code}. Please note if country is not specified then the search works for USA as a default. */
    zip: string;

    /** You can use lang parameter to get the output in your language.
Translation is applied for the city name and description fields. */
    lang:
      | "af"
      | "al"
      | "ar"
      | "az"
      | "bg"
      | "ca"
      | "cz"
      | "da"
      | "de"
      | "el"
      | "en"
      | "eu"
      | "fa"
      | "fi"
      | "fr"
      | "gl"
      | "he"
      | "hi"
      | "hr"
      | "hu"
      | "id"
      | "it"
      | "ja"
      | "kr"
      | "la"
      | "lt"
      | "mk"
      | "no"
      | "nl"
      | "pl"
      | "pt"
      | "pt_br"
      | "ro"
      | "ru"
      | "sv"
      | "sk"
      | "sl"
      | "es"
      | "sr"
      | "th"
      | "tr"
      | "uk"
      | "vi"
      | "zh_cn"
      | "zh_tw"
      | "zu";
  }>;

  export type GetCurrentResponse = {
    coord: { lon: number; lat: number };
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
    base: string;
    main: {
      temp: number;
      pressure: number;
      humidity: number;
      temp_min: number;
      temp_max: number;
    };
    visibility: number;
    wind: { speed: number; deg: number };
    clouds: { all: number };
    dt: number;
    sys: {
      type: number;
      id: number;
      message: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    id: number;
    name: string;
    cod: number;
  };

  export type ErrorResponse = { cod: string; message: string };

  export interface API {
    /**
     * Access current weather data for any location on Earth
     */
    getCurrent: (params: GetCurrentParams) => GetCurrentResponse;
  }
}
