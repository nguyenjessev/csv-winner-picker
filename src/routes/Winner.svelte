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
				<div>{key}: {winner[key]}</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.winner-picker {
		margin-top: 1rem;
	}
</style>
