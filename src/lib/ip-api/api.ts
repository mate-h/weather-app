import type { API, GetGeolocationResponse } from 'IPAPI';
import { useEffect } from 'preact/hooks';
import useFetch from 'use-http';
import {
  getGeolocationUrl,
  StatefulHook,
  defaultOptions,
  ipifyApiRoot,
} from '../config';

export const useFetchGeolocation: StatefulHook<API['getGeolocation']> = (
  options,
  params,
) => {
  const q = params.query;
  const url = new URL(getGeolocationUrl());
  delete params['query'];
  const fetchHook = useFetch<GetGeolocationResponse>(url.toString(), {
    ...defaultOptions,
    ...options,
  });

  const { loading, data } = useFetch(ipifyApiRoot, defaultOptions, []);

  useEffect(() => {
    if (q) {
      fetchHook.get(`/${q}?${new URLSearchParams(params as any).toString()}`);
    } else if (data) {
      fetchHook.get(
        `/${data}?${new URLSearchParams(params as any).toString()}`,
      );
    }
  }, [q, data]);

  return fetchHook;
};
