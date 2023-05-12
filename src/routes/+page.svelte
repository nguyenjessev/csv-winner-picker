<script>
	let files;
	let lines;
	let winner;

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

{#if lines}
	<div class="winner-picker">
		<button on:click={handlePickWinner}>Pick a Winner</button>

		{#if winner}
			<div class="winner-info">
				{#each Object.keys(winner) as key}
					<div>{key}: {winner[key]}</div>
				{/each}
			</div>
		{/if}
	</div>

	<div class="file-info">
		Entries found: {lines.length}
	</div>
{/if}
