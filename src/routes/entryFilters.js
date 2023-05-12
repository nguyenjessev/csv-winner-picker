const dedupeEntries = (entries) => {
	return entries.reduce((accumulator, entry) => {
		if (
			!accumulator.find((item) => {
				return item.Email === entry.Email || item['IP Address'] === entry['IP Address'];
			})
		) {
			accumulator.push(entry);
		}

		return accumulator;
	}, []);
};

export { dedupeEntries };
