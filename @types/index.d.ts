/// <reference types="svelte" />
/// <reference types="vite/client" />

export type FormStoreType = {
  yourname: string;
  zipcode: string;
  address: string;
  address2: string;
  manson: string;
  youremail: string;
  tel: string;
  pref: string;
  mailaddress: string;
  [key: string]: string;
};

export type ValidateResultsStateType = {
  yourname: boolean | string | undefined;
  zipcode: boolean | string | undefined;
  address: boolean | string | undefined;
  address2: boolean | string | undefined;
  manson: boolean | string | undefined;
  youremail: boolean | string | undefined;
  tel: boolean | string | undefined;
  pref: boolean | string | undefined;
  mailaddress: boolean | string | undefined;
  [key: string]: boolean | string | undefined;
};

export type DisplayContentsType = {
  isWelcomeStatement: boolean;
  isContactInformation: boolean;
  isUserInfo: boolean;
  isAddress: boolean;
  isContactInputField: boolean;
  isExplainAuthentication: boolean;
  isAuthenticationButton: boolean;
  [key: string]: boolean;
};

export type ValidationResult = {
  isValid: boolean;
  message?: string;
};

export type LegacyWordPressFormType = {
  ctn_wpc_f7_counter?: string; //session
  Meka?: string; //session
  CarName?: string; //session
  caryear?: string; //session
  carversion?: string; //session
  id?: number;
  "your-name"?: string;
  "your-email"?: string;
  zipcode?: string;
  form_pref?: string;
  form_address?: string;
  address2?: string;
  manson?: string;
  carmet?: string; //session
  kilomet?: string;
  tel?: string;
  "body-kit"?: string;
  color?: string; //session
  xilanh?: string;
  month?: string; //session
  zansai?: string;
  shaken?: string;
  status?: string; //session
  auto?: string; //session
  shawd?: string;
  shane?: string;
  shaxe?: string;
  history?: string; //session
  shazen?: string;
  shapa?: string;
  shahe?: string;
  shage?: string;
  shapi?: string;
  naika?: string;
  nairua?: string;
  naishito?: string;
  naieacon?: string;
  naitabaco?: string;
  sohinnabi?: string;
  sohinden?: string;
  sohinshito?: string;
  sohinhando?: string;
  sohinmonitor?: string;
  sohinsan?: string;
  sohintaiya?: string;
  date_881?: string;
  menu_520?: string;
  date_882?: string;
  menu_521?: string;
  date_883?: string;
  menu_522?: string;
};

interface ImportMetaEnv {
  MODE: string;
}
