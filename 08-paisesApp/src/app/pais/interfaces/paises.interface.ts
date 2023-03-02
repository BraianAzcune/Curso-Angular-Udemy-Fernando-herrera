export interface Country {
  name: Name;
  tld: string[];
  alpha2Code?: string;
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc?: string;
  independent: boolean;
  status: Status;
  unMember: boolean;
  currencies?: { [key: string]: Currency };
  idd: Idd;
  capital?: string[];
  altSpellings: string[];
  region: Region;
  subregion?: string;
  languages?: Languages;
  translations: { [key: string]: Translation };
  latlng: number[];
  landlocked: boolean;
  borders?: string[];
  area: number;
  demonyms: Demonyms;
  flag: string;
  maps: Maps;
  population: number;
  gini?: { [key: string]: number };
  fifa?: string;
  car: Car;
  timezones: string[];
  continents: string[];
  flags: CoatOfArms;
  coatOfArms: CoatOfArms;
  startOfWeek: StartOfWeek;
  capitalInfo: CapitalInfo;
  postalCode?: PostalCode;
}

export interface CapitalInfo {
  latlng?: number[];
}

export interface Car {
  signs?: string[];
  side: Side;
}

export enum Side {
  Left = 'left',
  Right = 'right',
}

export interface CoatOfArms {
  png?: string;
  svg?: string;
}

export interface Currency {
  name: string;
  symbol: string;
}

export interface Demonyms {
  eng: EngClass;
  fra?: EngClass;
}

export interface EngClass {
  f: string;
  m: string;
}

export interface Idd {
  root?: string;
  suffixes?: string[];
}

export interface Languages {
  hun?: string;
  fra?: string;
  mlg?: string;
  ita?: string;
  grn?: string;
  spa?: string;
  ara?: string;
  bul?: string;
  msa?: string;
  dan?: string;
  fao?: string;
  nld?: string;
  pap?: string;
  swe?: string;
  eng?: EngEnum;
  kat?: string;
  nor?: string;
  fij?: string;
  hif?: string;
  mri?: string;
  nzs?: string;
  hye?: string;
  mah?: string;
  bel?: string;
  rus?: string;
  por?: string;
  zho?: string;
  est?: string;
  ber?: string;
  mey?: string;
  hin?: string;
  tam?: string;
  mya?: string;
  cal?: string;
  cha?: string;
}

export enum EngEnum {
  English = 'English',
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName?: { [key: string]: Translation };
}

export interface Translation {
  official: string;
  common: string;
}

export interface PostalCode {
  format: string;
  regex?: string;
}

export enum Region {
  Africa = 'Africa',
  Americas = 'Americas',
  Antarctic = 'Antarctic',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania',
}

export enum StartOfWeek {
  Monday = 'monday',
  Sunday = 'sunday',
}

export enum Status {
  OfficiallyAssigned = 'officially-assigned',
}
