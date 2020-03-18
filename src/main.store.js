import { writable } from 'svelte/store';
export const highlightCountryCode = writable(false);
export const selectedCountryCode = writable(false);
export const selectedDateIndex = writable(0);
export const searchFilter = writable('');
export const type = writable('cases');
export const nav = writable('map');