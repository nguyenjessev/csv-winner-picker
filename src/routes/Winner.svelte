<script>
	export let winner;
</script>

<div class="winner-info">
	{#each Object.keys(winner) as key}
		<div>{key}: {winner[key]}</div>
	{/each}
</div>
