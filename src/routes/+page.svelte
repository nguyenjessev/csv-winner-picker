<script>
	let files;
	let lines;

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
	<div class="file-info">
		<ul>
			{#each lines as line}
				<li>{line}</li>
			{/each}
		</ul>
	</div>
{/if}
