<script>
	import { fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	export let winner;
</script>

<div class="winner-container">
	{#key winner}
		<div
			class="winner-info"
			in:fly={{ x: 500, duration: 500 }}
			out:fly={{ x: -500, duration: 600, easing: cubicInOut }}
			send
		>
			{#each Object.keys(winner) as key}
				<div class="key">{key}:</div>
				<div class="value">{winner[key]}</div>
			{/each}
		</div>
	{/key}
</div>

<style>
	.winner-container {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
	}

	.winner-info {
		background: hsl(240, 10%, 10%);
		border: 1px solid black;
		border-radius: 10px;
		box-shadow: 5px 5px 10px black;
		display: grid;
		gap: 0 1rem;
		grid-column: 1;
		grid-row: 1;
		grid-template-columns: 1fr 2fr;
		margin-top: 2rem;
		padding: 1rem;
		/* position: absolute; */
	}

	.key {
		color: hsl(0, 0%, 80%);
		font-weight: bold;
		text-align: right;
	}
</style>
