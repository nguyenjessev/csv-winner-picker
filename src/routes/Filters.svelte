<script>
	import { onMount } from 'svelte';
	import {
		headers,
		// states,
		// countries,
		blocklistedStates,
		blocklistedCountries,
		dedupeFilters,
		entries,
		filteredEntries
	} from './stores';
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';

	dayjs.extend(customParseFormat);

	let startDate;
	let endDate;

	// let stateSearch = '';
	// let countrySearch = '';

	const applyDateFilters = () => {
		filteredEntries.update(() => {
			return $filteredEntries.filter((entry) => {
				const entryDate = dayjs(entry.Date, 'MM/DD/YYYY HH:mm').add(3, 'hour');
				const start = startDate ? dayjs(startDate) : null;
				const end = endDate ? dayjs(endDate).add(1, 'day') : null;

				if (start && end) {
					return entryDate.isAfter(start) && entryDate.isBefore(end);
				} else if (start) {
					return entryDate.isAfter(start);
				} else if (end) {
					return entryDate.isBefore(end);
				} else {
					return true;
				}
			});
		});
	};

	const handleApplyFilters = () => {
		filteredEntries.update(() =>
			$entries.filter(
				(entry) =>
					!$blocklistedStates.includes(entry.State) &&
					!$blocklistedCountries.includes(entry.Country)
			)
		);

		applyDateFilters();

		filteredEntries.update(() => {
			if ($dedupeFilters.length) {
				return $filteredEntries.reduce((accumulator, entry) => {
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
				return $filteredEntries;
			}
		});

	};

	onMount(() => {
		handleApplyFilters();
	});
</script>

<!-- <fieldset class="state-filters">
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

<fieldset class="country-filters">
	<legend>Country Filters</legend>

	<input type="text" bind:value={countrySearch} />

	<div class="country-filter-options">
		{#each [...$countries].sort().sort((a, b) => {
			if ($blocklistedCountries.indexOf(a) >= 0) return -1;
			else if ($blocklistedCountries.indexOf(b) >= 0) return 1;
			return 0;
		}) as country}
			<div
				style="display: {country
					.toLowerCase()
					.indexOf(countrySearch.toLowerCase()) >= 0
					? 'block'
					: 'none'};"
			>
				<input
					type="checkbox"
					bind:group={$blocklistedCountries}
					name="country-filters"
					id="entry-country-{country}"
					value={country}
				/>
				<label for="entry-country-{country}">{country}</label>
			</div>
		{/each}
	</div>
</fieldset> -->

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
			<input
				type="date"
				name="start-date"
				id="start-date"
				bind:value={startDate}
			/>
		</div>

		<div class="date-group">
			<label for="end-date">End Date (inclusive)</label>
			<input type="date" name="end-date" id="end-date" bind:value={endDate} />
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

	.filters > * {
		flex: 1;
	}

	/* .state-filter-options,
	.country-filter-options {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		max-height: 10rem;
		overflow: scroll;
	} */

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
