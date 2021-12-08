import type { IncomingOptions, UseFetch } from 'use-http';
import useSSR from 'use-ssr';
const { isBrowser } = useSSR();

// OpenWeatherMap API config
export const appid = process.env.SNOWPACK_PUBLIC_API_KEY;
export const apiRoot = process.env.SNOWPACK_PUBLIC_API_ROOT;
export const getCurrentUrl = `${apiRoot}/data/2.5/weather`;

// IP API config
export const ipifyApiRoot = process.env.SNOWPACK_PUBLIC_IPIFY_API_ROOT;
export const ipApiRoot = process.env.SNOWPACK_PUBLIC_IP_API_ROOT;
export const getGeolocationUrl = (query?: string) =>
  query ? `${ipApiRoot}/json/${query}` : `${ipApiRoot}/json`;

// Google APIs config
export const googleApiKey = process.env.SNOWPACK_PUBLIC_GOOGLE_API_KEY;
export const geolocationApiRoot = `${process.env.SNOWPACK_PUBLIC_GOOGLE_APIS}/geolocation/v1/geolocate`;
export const placesAutocompleteApiUrl = `${process.env.SNOWPACK_PUBLIC_GOOGLE_MAPS}/maps/api/place/autocomplete/json`;

export type StatefulHook<T extends (...args: any) => any> = (
  options?: IncomingOptions,
  ...params: Parameters<T>
) => UseFetch<ReturnType<T>>;

export type StatelessHook<T extends (...args: any) => any> = (
  options?: IncomingOptions,
) => UseFetch<ReturnType<T>> & { route: (...params: Parameters<T>) => string };

// expiration is 24 hours by default
export const defaultOptions: IncomingOptions = {
  persist: isBrowser,
};

// 20 minute cache life
export const weatherUpdateOptions: IncomingOptions = {
  ...defaultOptions,
  cacheLife: 20 * 60 * 1000,
};

// autocomplete debounce config
export const debounceTime = 250;
export const debounceMaxWait = 1000;

const lookup = {
  'person.crop.circle': [56256, 56941],
  'person.crop.circle.fill': [56256, 56942],
  'checkmark.circle.fill': [56256, 56419],
  'chevron.left': [56256, 56713],
  'chevron.right': [56256, 56714],
  'chevron.up': [56256, 56711],
  'chevron.down': [56256, 56712],
  heart: [56256, 57012],
  'heart.fill': [56256, 57013],
  star: [56256, 57026],
  'star.fill': [56256, 57027],
  'star.lefthalf.fill': [56256, 57028],
  plus: [56256, 56700],
  minus: [56256, 56701],
  'trash.fill': [56256, 56850],
  circle: [56256, 56320],
  'xmark.circle.fill': [56256, 56417],
  'circle.lefthalf.fill': [56256, 56322],
  'circle.righthalf.fill': [56256, 56323],
  doc: [56256, 56887],
  'info.circle': [56256, 56692],
  'info.circle.fill': [56256, 56693],
  'location.slash.fill': [56257, 56877],
  map: [56257, 56906],
  'map.fill': [56257, 56907],
  clock: [56257, 56363],
  'clock.fill': [56257, 56364],

  cloud: [56256, 56770],
  'cloud.fill': [56256, 56771],
  'cloud.fog': [56256, 56778],
  'cloud.fog.fill': [56256, 56779],
  'sun.max.fill': [56256, 56750],
  'moon.stars.fill': [56256, 56769],
  'cloud.sun.fill': [56256, 56789],
  'cloud.moon.fill': [56256, 56795],
  clouds: [56256, 56802],
  'clouds.fill': [56256, 56803],
  'cloud.rain.fill': [56256, 56775],
  'cloud.rain': [56256, 56774],
  'cloud.sun.rain.fill': [56256, 56791],
  'cloud.moon.rain.fill': [56256, 56797],
  'cloud.bolt.rain.fill': [56256, 56799],
  'cloud.bolt.rain': [56256, 56798],
  snow: [56256, 56805],
};

export const icon = (name: keyof typeof lookup) => {
  return lookup[name].map((n: number) => String.fromCharCode(n)).join('');
};
