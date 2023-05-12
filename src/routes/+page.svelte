<script>
	import Winner from './Winner.svelte';
	import { dedupeEntries } from './entryFilters';

	let files;
	let entries = [];
	let headers;
	let winner;

	$: dedupedEntries = dedupeEntries(entries);

	const formatEntryData = () => {
		headers = entries.shift().split(',');

		if (entries[entries.length - 1] === '') entries.pop();

		entries = entries.map((entry) => {
			const entryData = entry.split(',');
			const result = {};

			for (let i = 0; i < headers.length; i += 1) {
				result[headers[i].trim()] = entryData[i].trim() || 'None';
			}

			return result;
		});
	};

	const readFile = (file) => {
		const reader = new FileReader();

		reader.onload = (e) => {
			entries = e.target.result.split('\n');

			formatEntryData();
		};
		reader.readAsText(file);
	};

	const handleFileUpload = () => {
		const uploadedFile = files[0];

		readFile(uploadedFile);
	};

	const handlePickWinner = () => {
		winner = entries[Math.floor(Math.random() * entries.length)];
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

{#if entries.length}
	<div class="filters">
		<fieldset>
			<legend>Properties to dedupe on:</legend>

			{#each headers as header}
				<div>
					<input type="checkbox" name="entry-header-{header}" id="entry-header-{header}" />
					<label for="entry-header-{header}">{header}</label>
				</div>
			{/each}
		</fieldset>
	</div>

	<div class="file-info">
		<span>Entries found: {entries.length}</span>
		<span>Unique entries: {dedupedEntries.length}</span>
	</div>

	<div class="winner-picker">
		<button on:click={handlePickWinner}>Pick a Winner</button>

		{#if winner}
			<Winner {winner} />
		{/if}
	</div>
{/if}

<style>
	.file-info {
		display: flex;
		flex-direction: column;
	}
</style>
