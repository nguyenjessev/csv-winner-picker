import { writable } from 'svelte/store';

export const entries = writable([]);
export const dedupeFilters = writable([]);

export const filteredEntries = writable([]);
