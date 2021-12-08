/** Based on docs from https://ip-api.com/docs/api:json */
declare module "IPAPI" {
  export type GetGeolocationParams = Partial<{
    /** If you don't require all the returned fields, use the GET parameter fields to specify which data should be returned.
Separate the fields by comma (fields=status,message,query,country,city) or use a generated, numeric value (to save bandwidth) */
    fields: string;
    /** Response language */
    lang: "en" | "de" | "es" | "pt-BR" | "fr" | "ja" | "zh-CN" | "ru";
    /** wrap inside (JSONP) */
    callback: string;
    /** can be a single IPv4/IPv6 address or a domain name. If you don't supply a query the current IP address will be used. */
    query: string;
  }>;

  export type GetGeolocationResponse = {
    query: string;
    status: string;
    country: string;
    countryCode: string;
    region: string;
    regionName: string;
    city: string;
    zip: string;
    lat: number;
    lon: number;
    timezone: string;
    isp: string;
    org: string;
    as: string;
  } & Partial<{
    // additional fields
    offset: number;
    continent: string;
    continentCode: string;
    district: string;
    currency: string;
    asname: string;
    reverse: string;
    mobile: boolean;
    proxy: boolean;
    hosting: boolean;
  }>;

  export interface API {
    getGeolocation: (params: GetGeolocationParams) => GetGeolocationResponse;
  }
}
