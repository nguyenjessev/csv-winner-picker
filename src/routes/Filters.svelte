<script>
	import {
		headers,
		dedupeFilters,
		geofilteredEntries,
		dedupedEntries
	} from './stores';

	const handleApplyDedupeFilters = () => {
		dedupedEntries.update(() => {
			if ($dedupeFilters.length) {
				return $geofilteredEntries.reduce((accumulator, entry) => {
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
				return $geofilteredEntries;
			}
		});
	};
</script>

<div class="filters">
	<fieldset>
		<legend>De-dupe Filters:</legend>

		{#each $headers as header}
			<div>
				<input
					type="checkbox"
					bind:group={$dedupeFilters}
					name="dedupe-filters"
					id="entry-header-{header}"
					value={header}
				/>
				<label for="entry-header-{header}">{header}</label>
			</div>
		{/each}

		<button on:click={handleApplyDedupeFilters}>Apply Filters</button>
	</fieldset>
</div>
