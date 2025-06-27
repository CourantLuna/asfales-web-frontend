// lib/data/region.ts

export interface Region {
  code: string;
  name: string;
  currency: string;
  flag: string; // URL al SVG
}

export const regions: Region[] = [
  {
    code: "US",
    name: "Estados Unidos",
    currency: "USD $",
    flag: "https://flagcdn.com/us.svg",
  },
  {
    code: "MX",
    name: "México",
    currency: "MXN $",
    flag: "https://flagcdn.com/mx.svg",
  },
  {
    code: "ES",
    name: "España",
    currency: "EUR €",
    flag: "https://flagcdn.com/es.svg",
  },
  {
    code: "JP",
    name: "Japón",
    currency: "JPY ¥",
    flag: "https://flagcdn.com/jp.svg",
  },
];
