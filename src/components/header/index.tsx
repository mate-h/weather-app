import { FunctionalComponent, h } from 'preact';
import Match from 'preact-router/match';
import { getCurrentUrl, route } from 'preact-router';
import { useState } from 'preact/hooks';
import { icon } from '../../lib/config';

const m = Match as any;

const Header: FunctionalComponent = () => {
  const [url, setUrl] = useState(getCurrentUrl());
  const handler = (e: Event) => {
    const href = (e.target as any).getAttribute('href');
    e.preventDefault();

    // do not push lateral routes onto history stack
    // replaces the current history entry
    route(href, true);
    setUrl(href);
  };
  const linkStyle = { maxWidth: '10.5rem' };
  const linkComponent =
    'relative button-states button-states-light px-2 md:px-4 w-1/3 sm:w-auto text-black text-opacity-72';
  const linkActive = ' text-primary text-opacity-100';
  const iconComponent = 'text-xl sm:text-sm mr-0 sm:mr-2 md:mr-4';
  const textStyle = { '--leading': 20 };
  const textComponent =
    'caption sm:subtitle2 transform translate-y-1 sm:translate-y-3 text-center pointer-events-none';
  return (
    <header class="px-2 md:px-4 flex bg-white text-black text-opacity-87 shadow-hairline shadow-hairline-light fixed w-full z-50 h-14">
      <p class="headline6 sm:headline5 transform translate-y-3 sm:translate-y-2 flex-grow">
        🌤 Weather
      </p>
      <nav class="bg-white flex fixed bottom-0 inset-x-0 sm:static h-14 sm:shadow-none shadow-hairline shadow-hairline-light justify-center">
        <a
          style={linkStyle}
          native
          onClick={handler}
          class={linkComponent + (url === '/' ? linkActive : '')}
          href="/"
        >
          <p style={textStyle} class={textComponent}>
            <i class={iconComponent}>
              {icon(url === '/' ? 'clock.fill' : 'clock')}
            </i>
            <br class="sm:hidden" />
            Forecast
          </p>
        </a>
        <a
          style={linkStyle}
          native
          onClick={handler}
          class={linkComponent + (url === '/map' ? linkActive : '')}
          href="/map"
        >
          <p style={textStyle} class={textComponent}>
            <i class={iconComponent}>
              {icon(url === '/map' ? 'map.fill' : 'map')}
            </i>
            <br class="sm:hidden" />
            Map
          </p>
        </a>
        <a
          style={linkStyle}
          native
          onClick={handler}
          class={linkComponent + (url === '/settings' ? linkActive : '')}
          href="/settings"
        >
          <p style={textStyle} class={textComponent}>
            <i class={iconComponent}>
              {icon(
                url === '/settings'
                  ? 'person.crop.circle.fill'
                  : 'person.crop.circle',
              )}
            </i>
            <br class="sm:hidden" />
            Settings
          </p>
        </a>
      </nav>
    </header>
  );
};

export default Header;
