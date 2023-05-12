import { derived, writable } from 'svelte/store';

export const entries = writable([]);
export const dedupeFilters = writable([]);

export const filteredEntries = derived(
	[entries, dedupeFilters],
	([$entries, $dedupeFilters]) => {
		if ($dedupeFilters.length) {
			return $entries.reduce((accumulator, entry) => {
				if (
					!accumulator.find((item) => {
						for (const filter of $dedupeFilters) {
							if (item[filter] === entry[filter]) return true;
						}
					})
				) {
					accumulator.push(entry);
				}

				return accumulator;
			}, []);
		} else {
			return $entries;
		}
	},
	[]
);
