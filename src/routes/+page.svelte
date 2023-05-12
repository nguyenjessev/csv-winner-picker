<script>
	import Winner from './Winner.svelte';

	let files;
	let lines = [];
	let winner;

	$: dedupedLines = lines.reduce((accumulator, entry) => {
		if (
			!accumulator.find((item) => {
				return item.Email === entry.Email || item['IP Address'] === entry['IP Address'];
			})
		) {
			accumulator.push(entry);
		}

		return accumulator;
	}, []);

	const formatEntryData = () => {
		const headers = lines.shift().split(',');

		lines.pop();

		lines = lines.map((entry) => {
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
			lines = e.target.result.split('\n');

			formatEntryData();
		};
		reader.readAsText(file);
	};

	const handleFileUpload = () => {
		const uploadedFile = files[0];

		readFile(uploadedFile);
	};

	const handlePickWinner = () => {
		winner = lines[Math.floor(Math.random() * lines.length)];
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

{#if lines.length}
	<div class="file-info">
		<span>Entries found: {lines.length}</span>
		<span>Unique entries: {dedupedLines.length}</span>
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
