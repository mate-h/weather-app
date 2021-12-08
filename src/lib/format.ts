import { getLanguageKey } from "./languages";

export const dateFormat = (date: string, language: string) =>
  new Intl.DateTimeFormat(language, {
    hour: "numeric",
    minute: "numeric",
    weekday: "long",
  }).format(new Date(date));

export const relativeFormat = (d: any, language: string) => {
  try {
    const diff = new Date().getTime() - new Date(d).getTime();
    const days = diff / (1000 * 3600 * 24);
    const rtf = new (Intl as any).RelativeTimeFormat(language);
    if (days > 31) {
      const months = diff / (1000 * 3600 * 24 * 30.42);
      return rtf.format(Math.ceil(-months), "month");
    }
    if (days > 1) {
      return rtf.format(Math.ceil(-days), "day");
    }
    const hours = diff / (1000 * 3600);
    if (hours >= 1) {
      return rtf.format(Math.ceil(-hours), "hour");
    }
    const minutes = diff / (1000 * 60);
    if (minutes >= 1) {
      return rtf.format(Math.ceil(-minutes), "minute");
    }
    return (now as any)[getLanguageKey(language)].toLowerCase();
  } catch (e) {
    return dateFormat(d, language);
  }
};

export const formatTemperature = (
  kelvin: number,
  language: string,
  unit?: string
) => {
  const c = kelvin - 273.15;
  const f = ((kelvin - 273.15) * 9) / 5 + 32;
  try {
    const formatter = new Intl.NumberFormat(language, {
      style: "unit",
      unit: unit || "celsius",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    } as any);

    const unitPart = formatter
      .formatToParts(c)
      .find((p) => (p.type as any) === "unit");
    const s = formatter.format(unit === "fahrenheit" ? f : c);
    if (unitPart) {
      const location = s.indexOf(unitPart.value);

      return [
        { value: s.slice(0, location) },
        { value: unitPart.value, unit: true },
        { value: s.slice(location + unitPart.value.length) },
      ].filter((a) => a.value);
    } else return [{ value: s }];
  } catch (e) {
    // fallback implementation
    const formatter = new Intl.NumberFormat(language, {
      style: "decimal",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    } as any);
    const languageKey = getLanguageKey(language);
    let unitPart = units.en[unit === "fahrenheit" ? "f" : "c"];
    if (["ar", "hi"].includes(languageKey))
      unitPart = (units as any)[languageKey][unit === "fahrenheit" ? "f" : "c"];
    return [
      { value: formatter.format(unit === "fahrenheit" ? f : c) },
      { value: unitPart, unit: true },
    ];
  }
};

const units = {
  ar: { c: "°م", f: "°ف" },
  hi: { c: "°से॰", f: "°फ़ेरन" },
  en: { c: "°C", f: "°F" },
};
const now = {
  en: "now",
  eu: "orain",
  am: "አሁን",
  ceb: "karon",
  fy: "no",
  gu: "હવે",
  haw: "kēia manawa",
  hu: "Most",
  ga: "anois",
  kk: "қазір",
  ky: "азыр",
  lb: "elo",
  mt: "issa",
  my: "အခု",
  st: "hona joale",
  fa: "اکنون",
  si: "දැන්",
  sw: "sasa",
  xh: "ngoku",
  zu: "manje",
  yo: "bayi",
  cy: "nawr",
  su: "ayeuna",
  sd: "هاڻي",
  gd: "a-nis",
  ps: "اوس",
  mn: "одоо",
  mg: "ankehitriny",
  la: "nunc",
  ku: "niha",
  kn: "ಈಗ",
  ig: "ugbu a",
  hmn: "tam sim no",
  ha: "yanzu",
  ka: "ახლა",
  co: "avà",
  bs: "sad",
  az: "İndi",
  sq: "tani",
  yi: "איצט",
  uz: "hozir",
  so: "hadda",
  sn: "ikozvino",
  sm: "nei",
  ne: "अब",
  mi: "ināianei",
  mk: "сега",
  lo: "ດຽວນີ້",
  km: "ឥឡូវ​នេះ",
  jv: "saiki",
  is: "núna",
  hi: "अभी",
  ht: "kounye a",
  gl: "agora",
  ny: "tsopano",
  be: "зараз",
  hy: "հիմա",
  af: "nou",
  ml: "ഇപ്പോൾ",
  ur: "ابھی",
  te: "ఇప్పుడు",
  ta: "இப்போது",
  mr: "आता",
  ms: "sekarang",
  bn: "এখন",
  tl: "ngayon",
  ca: "ara",
  vi: "hiện nay",
  uk: "зараз",
  tr: "şimdi",
  th: "ตอนนี้",
  tg: "ҳозир",
  sv: "nu",
  es: "ahora",
  sl: "zdaj",
  sk: "teraz",
  sr: "Сада",
  ru: "сейчас",
  ro: "acum",
  pt: "agora",
  pl: "teraz",
  no: "nå",
  lt: "dabar",
  lv: "tagad",
  ko: "지금",
  ja: "今",
  it: "adesso",
  id: "sekarang",
  he: "עַכשָׁיו",
  el: "τώρα",
  de: "jetzt",
  fr: "maintenant",
  fi: "nyt",
  et: "nüüd",
  eo: "nun",
  nl: "nu",
  da: "nu",
  cs: "Nyní",
  hr: "sada",
  "zh-TW": "現在",
  zh: "现在",
  bg: "сега",
  ar: "الآن",
};
