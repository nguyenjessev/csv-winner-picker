<script>
	import { filteredEntries } from './stores';

	export let winner;

	const handlePickWinner = () => {
		winner =
			$filteredEntries[Math.floor(Math.random() * $filteredEntries.length)];
	};
</script>

<div class="winner-picker">
	<button on:click={handlePickWinner}>Pick a Winner</button>

	{#if winner}
		<div class="winner-info">
			{#each Object.keys(winner) as key}
				<span class="key">{key}:</span> <span class="value">{winner[key]}</span>
			{/each}
		</div>
	{/if}
</div>

<style>
	.winner-picker {
		margin-top: 1rem;
	}

	.winner-info {
		background: hsl(240, 10%, 15%);
		border: 1px solid black;
		border-radius: 10px;
		box-shadow: 5px 5px 10px black;
		display: grid;
		gap: 0 1rem;
		grid-template-columns: 1fr 2fr;
		margin-top: 1rem;
		padding: 20px;
	}

	.key {
		color: hsl(0, 0%, 80%);
		font-weight: bold;
		text-align: right;
	}
</style>
