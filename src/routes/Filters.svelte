<script>
	import {
		headers,
		dedupeFilters,
		geofilteredEntries,
		dedupedEntries
	} from './stores';

	const handleApplyFilters = () => {
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
	<fieldset class="dedupe-filters">
		<legend>De-dupe Filters</legend>

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
	</fieldset>

	<div class="date-filters">
		<label for="">Start Date</label>

		<label for="">End Date</label>
	</div>
</div>

<button class="apply-filters-button" on:click={handleApplyFilters}
	>Apply Filters</button
>

<style>
	.filters {
		display: flex;
		gap: 1rem;
		margin-top: 1rem;
	}

	.date-filters {
		display: flex;
		flex-direction: column;
	}

	.apply-filters-button {
		margin-top: 1rem;
	}
</style>
