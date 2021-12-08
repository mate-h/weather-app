import { h } from 'preact';
import { usePersistedState } from '../lib/hooks';
import { useContainer, CurrentPosition } from './containers';
import { useTranslation } from '../lib/translations';
import { icon } from '../lib/config';

export function LocationBanner({ class: className }: { class?: string }) {
  const [visible, setVisible] = usePersistedState(
    'locationBanner.visible',
    true,
  );
  const { permissionState, setPosition } = useContainer(CurrentPosition);
  const { t } = useTranslation();
  function handler() {
    function success(p: Position) {
      // TODO: display snackbar "Location updated" with new, more accurate location
      setPosition(p);
    }
    function error(e: PositionError) {
      // TODO: display snackbar with error
      console.log(e);
      alert(e.message);
    }
    navigator.geolocation.getCurrentPosition(success, error, {});
  }
  function handlerDismiss() {
    setVisible(false);
  }
  if (!visible) return null;
  const bannerComponent =
    'overflow-hidden shadow-hairline shadow-hairline-light full-width-sticky left-0 z-20 clearfix sticky top-14 bg-white sm:flex p-2 md:p-4';
  if (permissionState === 'denied')
    return (
      <div class={[bannerComponent, className].join(' ')}>
        <p class="flex-grow transform -translate-y-1 body2 text-black text-opacity-87 sm:truncate">
          {t('locationBanner.denied')}
        </p>
        <button
          onClick={handlerDismiss}
          class="float-right flex-shrink-0 h-10 sm:h-6 button-states button-states-light relative overflow-hidden rounded px-4 sm:px-2 outline-none focus:outline-none focus:shadow-outline"
        >
          <div class="h-10 sm:h-6 overflow-hidden">
            <p class="capitalize sm:transform sm:-translate-y-2 subtitle2 text-primary">
              {t('locationBanner.dismiss')}
            </p>
          </div>
        </button>
      </div>
    );

  // only render if permission can be granted by prompt
  if (permissionState !== 'prompt') return null;

  return (
    <div class={[bannerComponent, className].join(' ')}>
      <p class="flex-grow transform -translate-y-1 body2 text-black text-opacity-87 sm:truncate">
        <i>{icon('location.slash.fill')}</i>
        {` ${t('locationBanner.prompt')}`}
      </p>
      <button
        onClick={handlerDismiss}
        class="transition-shadow duration-150 mx-0 sm:mx-4 md:mx-6 float-right flex-shrink-0 h-10 sm:h-6 button-states button-states-light relative overflow-hidden rounded px-4 sm:px-2 outline-none focus:outline-none focus:shadow-outline"
      >
        <div class="h-10 sm:h-6 overflow-hidden">
          <p class="capitalize sm:transform sm:-translate-y-2 subtitle2 text-primary">
            {t('locationBanner.dismiss')}
          </p>
        </div>
      </button>
      <button
        onClick={handler}
        class="transition-shadow duration-150 mx-4 sm:mx-0 float-right flex-shrink-0 h-10 sm:h-6 button-states button-states-light relative overflow-hidden rounded px-4 sm:px-2 outline-none focus:outline-none focus:shadow-outline"
      >
        <div class="h-10 sm:h-6 overflow-hidden">
          <p class="capitalize sm:transform sm:-translate-y-2 subtitle2 text-primary">
            {t('locationBanner.allow')}
          </p>
        </div>
      </button>
    </div>
  );
}
