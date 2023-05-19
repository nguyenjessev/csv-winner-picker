<script>
	import { onMount } from 'svelte';
	import {
		headers,
		states,
		blocklistedStates,
		blocklistedCountries,
		dedupeFilters,
		entries,
		geofilteredEntries,
		dedupedEntries
	} from './stores';

	let stateSearch = '';

	const handleApplyFilters = () => {
		geofilteredEntries.update(() =>
			$entries.filter(
				(entry) =>
					!$blocklistedStates.includes(entry.State) &&
					!$blocklistedCountries.includes(entry.Country)
			)
		);

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

	onMount(() => {
		handleApplyFilters();
	});
</script>

<fieldset class="state-filters">
	<legend>State Filters</legend>

	<input type="text" bind:value={stateSearch} />

	<div class="state-filter-options">
		{#each [...$states].sort().sort((a, b) => {
			if ($blocklistedStates.indexOf(a) >= 0) return -1;
			else if ($blocklistedStates.indexOf(b) >= 0) return 1;
			return 0;
		}) as state}
			<div
				style="display: {state
					.toLowerCase()
					.indexOf(stateSearch.toLowerCase()) >= 0
					? 'block'
					: 'none'};"
			>
				<input
					type="checkbox"
					bind:group={$blocklistedStates}
					name="state-filters"
					id="entry-state-{state}"
					value={state}
				/>
				<label for="entry-state-{state}">{state}</label>
			</div>
		{/each}
	</div>
</fieldset>

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
		<div class="date-group">
			<label for="start-date">Start Date (inclusive)</label>
			<input type="date" name="start-date" id="start-date" />
		</div>

		<div class="date-group">
			<label for="end-date">End Date (inclusive)</label>
			<input type="date" name="end-date" id="end-date" />
		</div>
	</div>
</div>

<button class="apply-filters-button" on:click={handleApplyFilters}
	>Apply Filters</button
>

<div>Processing can take a long time with many entries. Please be patient!</div>

<style>
	.filters {
		display: flex;
		gap: 1rem;
		margin-top: 1rem;
	}

	.state-filter-options {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		max-height: 10rem;
		overflow: scroll;
	}

	.date-filters,
	.date-group {
		display: flex;
		flex-direction: column;
	}

	.date-filters {
		gap: 1rem;
	}

	.apply-filters-button {
		margin-top: 1rem;
	}
</style>
