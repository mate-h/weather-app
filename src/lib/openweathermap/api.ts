import type { API, GetCurrentResponse, GetCurrentParams } from 'OpenWeatherMap';
import useFetch from 'use-http';
import {
  getCurrentUrl,
  appid,
  StatefulHook,
  weatherUpdateOptions,
  StatelessHook,
} from '../config';
import { useEffect } from 'preact/hooks';
import { useFetchGeolocation } from '../ip-api/api';
import {
  useContainer,
  Settings,
  CurrentPosition,
} from '../../components/containers';
import { getLangParam } from '../languages';

const defaultParams: GetCurrentParams = {
  appid,
};

export const route = (o: GetCurrentParams) =>
  `?${new URLSearchParams(o as any)}`;

export const useFetchCurrentWeather: StatefulHook<API['getCurrent']> = (
  options,
  params,
) => {
  const {
    settings: { locale },
  } = useContainer(Settings);

  defaultParams.lang = getLangParam(locale);
  const url = new URL(getCurrentUrl);
  url.search = new URLSearchParams({
    ...defaultParams,
    ...params,
  } as any).toString();
  return useFetch<GetCurrentResponse>(
    url.toString(),
    { ...weatherUpdateOptions, ...options },
    [
      ...Object.values(
        {
          ...defaultParams,
          ...params,
        } || {},
      ),
    ],
  );
};
export const useFetchQueryWeather: StatelessHook<API['getCurrent']> = (
  options,
) => {
  const {
    settings: { locale },
  } = useContainer(Settings);

  defaultParams.lang = getLangParam(locale);
  const url = new URL(getCurrentUrl);
  const fetchHook = useFetch<GetCurrentResponse>(url.toString(), {
    ...weatherUpdateOptions,
    ...options,
  });
  return {
    ...fetchHook,
    route: (params) => route({ ...defaultParams, ...params }),
  };
};

export const useFetchLocationWeather: StatefulHook<API['getCurrent']> = (
  options,
  params,
) => {
  const { position, permissionState } = useContainer(CurrentPosition);

  const { loading, data } = useFetchGeolocation({}, {});

  const {
    settings: { locale },
  } = useContainer(Settings);

  defaultParams.lang = getLangParam(locale);

  const url = new URL(getCurrentUrl);
  const fetchHook = useFetch<GetCurrentResponse>(url.toString(), {
    ...weatherUpdateOptions,
    ...options,
  });

  useEffect(() => {
    // console.log(permissionState, position);
    // waiting for permission query callback
    if (!position) {
      if (permissionState === undefined) return;
      if (permissionState === 'granted' && position === undefined) return;
    }

    // use latitude and longitude if position is available
    if (position && permissionState !== 'denied') {
      fetchHook.get(
        route({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          ...defaultParams,
          ...params,
        }),
      );
    }
    // fallback to IP based geolocation
    else if (data) {
      fetchHook.get(
        route({
          lat: data.lat,
          lon: data.lon,
          ...defaultParams,
          ...params,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data, permissionState, position, defaultParams.lang]);

  return fetchHook;
};
