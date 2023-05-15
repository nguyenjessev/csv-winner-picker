<script>
	import { dedupedEntries } from './stores';

	export let winner;

	const handlePickWinner = () => {
		winner =
			$dedupedEntries[Math.floor(Math.random() * $dedupedEntries.length)];
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
