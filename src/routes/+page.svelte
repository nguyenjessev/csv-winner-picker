<script>
	import Filters from './Filters.svelte';
	import Winner from './Winner.svelte';
	import {
		headers,
		blocklistedStates,
		blocklistedCountries,
		entries,
		geofilteredEntries,
		dedupedEntries
	} from './stores.js';

	let files;
	let winner;

	const formatEntryData = () => {
		headers.update(() => $entries[0].trim().split(','));

		entries.update((n) => {
			n.shift();
			return n;
		});

		if ($entries[$entries.length - 1] === '')
			entries.update((n) => {
				n.pop();
				return n;
			});

		entries.update((n) => {
			return n.map((entry) => {
				const entryData = entry.split(',');
				const result = {};

				for (let i = 0; i < $headers.length; i += 1) {
					result[$headers[i].trim()] = entryData[i].trim() || 'None';
				}

				return result;
			});
		});

		geofilteredEntries.update(() =>
			$entries.filter(
				(entry) =>
					!$blocklistedStates.includes(entry.State) &&
					!$blocklistedCountries.includes(entry.Country)
			)
		);

		dedupedEntries.update(() => $geofilteredEntries);
	};

	const readFile = (file) => {
		const reader = new FileReader();

		reader.onload = (e) => {
			entries.set(e.target.result.split('\n'));

			formatEntryData();
		};
		reader.readAsText(file);
	};

	const handleFileUpload = () => {
		const uploadedFile = files[0];

		readFile(uploadedFile);
	};
</script>

<h1>CSV Winner Picker</h1>

<label for="file-upload">Upload a file:</label>
<input
	type="file"
	id="file-upload"
	name="file-upload"
	accept="text/csv"
	bind:files
	on:change={handleFileUpload}
/>

{#if $entries.length}
	<Filters />

	<div class="file-info">
		<span>Entries found: {$entries.length}</span>
		<span>Eligible entries: {$dedupedEntries.length}</span>
	</div>

	<Winner {winner} />
{/if}

<style>
	.file-info {
		display: flex;
		flex-direction: column;
		margin-top: 1rem;
	}
</style>
