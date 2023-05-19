<script>
	import Filters from './Filters.svelte';
	import Winner from './Winner.svelte';
	import {
		headers,
		// states,
		// countries,
		entries,
		filteredEntries
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

		// 	states.update(() => {
		// 		const list = new Set();

		// 		for (const entry of $entries) {
		// 			list.add(entry.State);
		// 		}

		// 		return list;
		// 	});

		// 	countries.update(() => {
		// 		const list = new Set();

		// 		for (const entry of $entries) {
		// 			list.add(entry.Country);
		// 		}

		// 		return list;
		// 	});
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

	const handleDragEnter = (e) => {
		e.stopPropagation();
		e.preventDefault();
	};
	const handleDragOver = (e) => {
		e.stopPropagation();
		e.preventDefault();

		e.dataTransfer.dropEffect = 'copy';
	};
	const handleDrop = (e) => {
		e.stopPropagation();
		e.preventDefault();

		const dt = e.dataTransfer;
		files = dt.files;

		handleFileUpload();
	};
</script>

<header>
	<h1>WINNR PICKR</h1>
</header>

<div class="container">
	<label
		for="file-upload"
		on:dragenter={handleDragEnter}
		on:dragover={handleDragOver}
		on:drop={handleDrop}>Upload a File</label
	>
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
			<span>Eligible entries: {$filteredEntries.length}</span>
		</div>

		<Winner {winner} />
	{/if}
</div>

<style>
	header {
		background: hsl(240, 10%, 10%);
		padding: 1rem;
	}

	h1 {
		margin: 0 auto;
		max-width: 600px;
		width: 100%;
	}

	.container {
		margin: 0 auto;
		margin-top: 1rem;
		max-width: 600px;
		padding-bottom: 1rem;
	}

	.container > label {
		border: 4px dashed hsl(0, 0%, 0%);
		border-radius: 10px;
		color: hsl(0, 0%, 40%);
		display: grid;
		font-size: 2rem;
		height: 10rem;
		place-items: center;
		transition: 500ms;
		width: 100%;
	}

	.container > label:hover {
		border: 4px dashed white;
		color: white;
		cursor: pointer;
	}

	#file-upload {
		clip: rect(1px, 1px, 1px, 1px);
		height: 1px;
		overflow: hidden;
		position: absolute;
		width: 1px;
	}

	.file-info {
		display: flex;
		flex-direction: column;
		margin-top: 1rem;
	}
</style>
