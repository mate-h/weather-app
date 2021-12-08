import { useEffect, useState } from 'preact/hooks';
import {
  useContainer,
  Settings,
  CurrentPosition,
} from '../../components/containers';
import useFetch, { IncomingOptions } from 'use-http';
import { googleApiKey, placesAutocompleteApiUrl } from '../config';
import { useFetchGeolocation } from '../ip-api/api';
import { getLanguageKey } from '../languages';

const defaultParams = {
  key: googleApiKey as string,
  types: '(cities)',
  radius: 50000, // 50km
};

export const route = (o: any) => `?${new URLSearchParams(o)}`;

export type PlacesAutocompleteResponse = {
  status: string;
  predictions: {
    description: 'string';
    matched_substrings: [{ length: number; offset: number }];
    place_id: string;
    reference: string;
    terms: [{ offset: number; value: string }];
    types: string[];
  }[];
};

export function usePlaceAutocomplete(options?: IncomingOptions) {
  const { position } = useContainer(CurrentPosition);
  const { data } = useFetchGeolocation({}, {});

  const {
    settings: { locale },
  } = useContainer(Settings);

  const language = getLanguageKey(locale);

  const url = new URL(placesAutocompleteApiUrl);
  const fetchHook = useFetch<PlacesAutocompleteResponse>(
    url.toString(),
    options,
  );

  const [location, setLocation] = useState<string>('');
  useEffect(() => {
    let location;
    if (position) {
      location = `${position.coords.latitude},${position.coords.longitude}`;
    } else if (data) {
      location = `${data.lat},${data.lon}`;
    }

    if (location) setLocation(location);
  }, [position, data]);

  return {
    ...fetchHook,
    route: (params: any) =>
      route({
        ...defaultParams,
        location,
        language,
        ...params,
      }),
  };
}
