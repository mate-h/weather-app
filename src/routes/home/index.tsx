import { h } from 'preact';
import { LocationBanner } from '../../components/LocationBanner';
import {
  WeatherCityCard,
  WeatherLocationCard,
} from '../../components/WeatherCard';
import { icon } from '../../lib/config';
import { LanguagePicker } from '../../components/LanguagePicker';
import { CityPicker } from '../../components/CityPicker';
import { useTranslation } from '../../lib/translations';
import { useContainer, Settings } from '../../components/containers';
import style from './style.module.css';

function App() {
  const backgroundStyle = {
    '--src': `url("/assets/background/weather-bg-1.jpg")`,
  };
  const gridComponent =
    'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6';
  const { t } = useTranslation();
  const {
    settings: { cities },
  } = useContainer(Settings);
  return (
    <main
      style={backgroundStyle as any}
      class={`${style['app-background']} ${style['home']} relative container mx-auto px-4 md:px-6`}
    >
      <div
        style={{ top: 0, bottom: 0 }}
        class={`${style['baseliner']} exclude -my-4 md:-my-6`}
      />
      <LocationBanner class={style['exclude']} />
      <LanguagePicker class="relative my-4 md:my-6" />
      <p class="headline5 sm:headline4 text-white transform -translate-y-1">
        {t('title')}
      </p>

      <div class="relative my-4 md:my-6">
        <p style={{ '--bottom': 8 }} class="overline text-white">
          {`${t('location')} `}
          <i
            tabIndex={-1}
            title={t('location.description')}
            aria-label={t('location.description')}
            class="text-sm cursor-pointer"
          >
            {icon('info.circle')}
          </i>
        </p>
        <div class={gridComponent}>
          <WeatherLocationCard class={style['app-background-cover']} />
        </div>
      </div>
      <CityPicker />
      {cities.length !== 0 && (
        <div class="relative my-4 md:my-6">
          <p style={{ '--bottom': 8 }} class="overline text-white">
            {t('yourCities')}
          </p>

          <div class={gridComponent}>
            {cities.map((id) => (
              <WeatherCityCard
                class={style['app-background-cover']}
                key={id}
                cityId={id}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
