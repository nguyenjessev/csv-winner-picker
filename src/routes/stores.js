import { writable } from 'svelte/store';

export const entries = writable([]);
export const dedupeFilters = writable([]);

export const geofilteredEntries = writable([]);

export const dedupedEntries = writable([]);
