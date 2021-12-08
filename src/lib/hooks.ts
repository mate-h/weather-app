import { window } from 'ssr-window';
import { useState, useEffect } from 'preact/hooks';
import {
  useFetchCurrentWeather,
  useFetchLocationWeather,
} from './openweathermap/api';

export function usePersistedState<T>(key: string, defaultValue?: any) {
  const [state, setState] = useState<T>(() => {
    const item = window.localStorage.getItem(key);
    if (item !== null && item !== undefined) {
      return JSON.parse(item);
    }

    return defaultValue;
  });
  useEffect(() => {
    if (state !== undefined)
      window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  function resetState(overrideDefault?: any) {
    if (overrideDefault !== undefined) {
      setState(overrideDefault);
      window.localStorage.setItem(key, JSON.stringify(overrideDefault));
    } else if (defaultValue) {
      setState(defaultValue);
      window.localStorage.setItem(key, JSON.stringify(defaultValue));
    } else {
      setState(undefined as any);
      window.localStorage.removeItem(key);
    }
  }
  return [
    state as T,
    setState as React.Dispatch<React.SetStateAction<T>>,
    resetState,
  ];
}

export function useLocationWeather() {
  return useFetchLocationWeather({}, {});
}

export function useSettings() {
  const [settings, setSettings] = usePersistedState('app.settings', {
    imperial: false,
    locale: window.navigator.language,
    cities: [],
  });

  function updateSettings(newSettings: any) {
    setSettings({
      ...settings,
      ...newSettings,
    });
  }

  return {
    settings: settings as {
      imperial: boolean;
      locale: string;
      cities: number[];
    },
    updateSettings,
  };
}

export function usePosition() {
  const [permissionState, setPermissionState] = useState<PermissionState>(
    'prompt',
  );
  const [position, setPosition, resetPosition] = usePersistedState(
    'app.lastPosition',
  );
  const successCallback: PositionCallback = (position) => {
    const copy = {
      timestamp: position.timestamp,
      coords: {
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        heading: position.coords.heading,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        speed: position.coords.speed,
      },
    };
    setPosition(copy);
  };
  const errorCallback: PositionErrorCallback = (error) => {
    console.log(error);
    // denied prompt

    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  // limit running the effect on component mount
  useEffect(() => {
    try {
      navigator.permissions
        .query({
          name: 'geolocation',
        })
        .then(function (result) {
          if (result.state === 'granted') {
            setPermissionState(result.state);
            navigator.geolocation.getCurrentPosition(
              successCallback,
              errorCallback,
              {},
            );
          } else if (result.state === 'prompt') {
            setPermissionState(result.state);
          } else if (result.state === 'denied') {
            setPermissionState(result.state);
          }
          result.onchange = function () {
            setPermissionState(result.state);
          };
        });
    } catch (e) {
      setPermissionState('prompt');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (permissionState === 'denied') {
      resetPosition();
    }
  }, [permissionState, resetPosition]);

  return {
    permissionState,
    position: position as Position,
    setPosition: successCallback,
  };
}
