import { writable, type Writable } from "svelte/store";
import type { FormStoreType } from "@type/index";

export const formStore: Writable<FormStoreType> = writable({
  yourname: "",
  zipcode: "",
  address: "",
  address2: "",
  manson: "",
  youremail: "",
  tel: "",
  pref: "",
  mailaddress: "",
});
