import { useContainer, Settings } from '../components/containers';
import { getLanguageKey } from './languages';
import translationData from './translationData.json';

export const data = Object.fromEntries(
  Object.entries(translationData).map(([k, v]) => [
    k,
    {
      yourCities: v[0],
      addCity: v[1],
      cityName: v[2],
      'locationBanner.dismiss': v[3],
      'locationBanner.allow': v[4],
      'locationBanner.prompt': v[5],
      'locationBanner.denied': v[6],
      'location.description': v[7],
      location: v[8],
      title: v[9],
      language: v[10],
      confirmDelete: v[11],
      noResults: v[12],
    },
  ]),
);

export function t(key: keyof typeof data.en, bcpTag: string) {
  return data[getLanguageKey(bcpTag)][key];
}

export function useTranslation() {
  const {
    settings: { locale },
  } = useContainer(Settings);
  function get(key: keyof typeof data.en) {
    return t(key, locale);
  }
  return { t: get };
}
