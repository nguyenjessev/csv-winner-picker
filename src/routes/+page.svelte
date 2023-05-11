<script>
	const handleFileUpload = () => {};
</script>

<h1>CSV Winner Picker</h1>

<label for="file-upload">Upload a file:</label>
<input
	type="file"
	id="file-upload"
	name="file-upload"
	accept="text/csv"
	on:change={handleFileUpload}
/>
