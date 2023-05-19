import { writable } from 'svelte/store';

export const headers = writable([]);
export const states = writable([]);
export const blocklistedStates = writable([
	'Florida',
	'New York',
	'Rhode Island'
]);
export const blocklistedCountries = writable([
	'Guam',
	'Puerto Rico',
	'U.S. Virgin Islands'
]);
export const dedupeFilters = writable([]);

export const entries = writable([]);
export const geofilteredEntries = writable([]);
export const dedupedEntries = writable([]);
