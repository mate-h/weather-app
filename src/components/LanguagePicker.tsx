import { h } from 'preact';
import {
  supported,
  getLanguageKey,
  nativeNames,
  getEmoji,
} from '../lib/languages';
import { useContainer, Settings } from './containers';
import { t } from '../lib/translations';
export function LanguagePicker({ class: className }: { class?: string }) {
  const {
    settings: { locale },
    updateSettings,
  } = useContainer(Settings);

  const value = supported.includes(locale) ? locale : getLanguageKey(locale);

  const handler: h.JSX.GenericEventHandler<HTMLSelectElement> = (e: any) => {
    updateSettings({
      locale: e.target.value,
    });
  };
  return (
    <div class={['sm:flex sm:flex-wrap', className].join(' ')}>
      <label class="cursor-pointer" htmlFor="language">
        <p style={{ '--bottom': 8 }} class="caption text-white">
          {t('language', locale)}
        </p>
      </label>

      <span class="button-states button-states-light dropdown dropdown-right-3 sm:dropdown-right-1 relative h-10 sm:h-6 mx-0 sm:mx-4 md:mx-6 inline-block">
        <select
          onChange={handler}
          value={value}
          class="body1 sm:body2 bg-white transition-shadow duration-150 shadow-hairline shadow-hairline-light rounded h-10 sm:h-6 pr-10 px-4 sm:px-2 sm:pr-8 appearance-none outline-none focus:shadow-outline"
          name="language"
          id="language"
        >
          {supported
            .map((l) => [l, nativeNames[getLanguageKey(l)], getEmoji(l)])
            .map(([lang, name, emoji]) => (
              <option key={lang} value={lang as string}>
                {emoji} {name || lang}
              </option>
            ))}
        </select>
      </span>
    </div>
  );
}
