<script>
	import { filteredEntries } from './stores';
	import WinnerInfo from './WinnerInfo.svelte';

	export let winner;

	const handlePickWinner = () => {
		winner =
			$filteredEntries[Math.floor(Math.random() * $filteredEntries.length)];
	};
</script>

<div class="winner-picker">
	<button on:click={handlePickWinner} class="pick-winner-button"
		>Pick a Winner</button
	>

	{#if winner}
		<WinnerInfo {winner} />
	{/if}
</div>

<style>
	.winner-picker {
		margin-top: 1rem;
	}

	.pick-winner-button {
		background: hsl(120, 40%, 40%);
		border: none;
		border-radius: 10px;
		box-shadow: 5px 5px 10px black;
		color: white;
		font-size: 1.5rem;
		padding: 1rem;
		transition: 200ms;
		width: 100%;
	}

	.pick-winner-button:hover {
		background: hsl(120, 50%, 40%);
		cursor: pointer;
		transform: scale(1.1);
	}
</style>
