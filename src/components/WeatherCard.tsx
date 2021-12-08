import { h } from 'preact';
import { icon } from '../lib/config';
import { useContainer, CurrentWeather, Settings } from './containers';
import { relativeFormat, formatTemperature } from '../lib/format';
import icons from '../lib/openweathermap/icons';
import { useFetchCurrentWeather } from '../lib/openweathermap/api';
import type { GetCurrentResponse } from 'OpenWeatherMap';
import { t } from '../lib/translations';

export function WeatherLocationCard({ class: className }: { class?: string }) {
  let { loading, data } = useContainer(CurrentWeather);

  return <WeatherCardBase class={className} loading={loading} data={data} />;
}

export function WeatherCityCard({
  cityId,
  class: className,
}: {
  cityId: number;
  class?: string;
}) {
  let { loading, data } = useFetchCurrentWeather({}, { id: cityId });
  const {
    settings: { cities, locale },
    updateSettings,
  } = useContainer(Settings);
  function deleteHandler() {
    if (window.confirm(t('confirmDelete', locale))) {
      updateSettings({
        cities: cities.filter((id) => id !== cityId),
      });
    }
  }
  return (
    <WeatherCardBase
      class={className}
      loading={loading}
      data={data}
      deletable={true}
      onDelete={deleteHandler}
    />
  );
}

function WeatherCardBase({
  loading,
  data,
  deletable = false,
  onDelete,
  class: className,
}: {
  loading: boolean;
  deletable?: boolean;
  data?: GetCurrentResponse;
  onDelete?: () => void;
  class?: string;
}) {
  const { settings, updateSettings } = useContainer(Settings);
  // TODO: loading skeleton
  if (!data || !data.main) {
    return null;
  }

  const formatParts = formatTemperature(
    data.main.temp,
    settings.locale,
    settings.imperial ? 'fahrenheit' : 'celsius',
  );
  return (
    <div
      class={`${className} shadow-hairline shadow-hairline-dark relative bg-black bg-opacity-72 text-white p-4 md:p-6 rounded-lg`}
    >
      <p class="caption text-opacity-72 text-white">
        {relativeFormat(data.dt * 1000, settings.locale)}
      </p>
      <p class="headline6">
        {data.name}, {data.sys.country}{' '}
        <i class="px-2">{icon('chevron.right')}</i>
      </p>
      <div class="flex">
        <i class="text-2xl transform translate-y-8">
          {icon(icons[data.weather[0].icon])}
        </i>
        <div class="px-4 md:px-6">
          <div class="transform translate-y-2 select-none rounded overflow-hidden button-states button-states-dark relative cursor-pointer">
            <p
              onClick={() => updateSettings({ imperial: !settings.imperial })}
              class="headline3 transform -translate-y-2"
            >
              {formatParts.map((p, i) =>
                p.unit ? (
                  <span
                    key={i}
                    class="inline-block headline6 transform -translate-y-5"
                  >
                    {p.value}
                  </span>
                ) : (
                  p.value
                ),
              )}
            </p>
          </div>

          <p class="subtitle1">{data.weather[0].description}</p>
        </div>
      </div>
      {deletable && (
        <i
          ref={(node) => {
            if (node) {
              node.style.setProperty('position', 'absolute', 'important');
            }
          }}
          class="transition-colors duration-75 right-0 top-0 p-4 md:p-6 cursor-pointer text-white text-opacity-54 hover:text-opacity-100 active:text-opacity-100"
          onClick={onDelete}
        >
          {icon('trash.fill')}
        </i>
      )}
    </div>
  );
}
