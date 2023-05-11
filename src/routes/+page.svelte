<script>
	let files;
	let lines;
	let winner;

	const readFile = (file) => {
		const reader = new FileReader();

		reader.onload = (e) => {
			lines = e.target.result.split('\n');
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
				{winner}
			</div>
		{/if}
	</div>

	<div class="file-info">
		<ul>
			{#each lines as line}
				<li>{line}</li>
			{/each}
		</ul>
	</div>
{/if}
