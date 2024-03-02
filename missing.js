const fs = require('fs');

// Read the JSON file
fs.readFile('output/sprites.json', 'utf8', (err, jsonString) => {
	if (err) {
		console.log("File read failed:", err);
		return;
	}

	// Parse the JSON
	let existsJSON = {};
	let missingJSON = {};
	const data = JSON.parse(jsonString);

	// Iterate over the keys in the object
	for (let key in data) {
		existsJSON[key] = [];
		missingJSON[key] = [];
		// Iterate over the items in the array
		for (let item of data[key]) {
			// If the item has a key "item_id" that starts with "bedrock/", print the item
			if (item.item_id && item.item_id.startsWith('bedrock/')) {
				missingJSON[key].push(item.item_id);
			}
			if (item.item_id && !item.item_id.startsWith('bedrock/')) {
				existsJSON[key].push(item);
			}
		}
	}
	fs.writeFileSync('missing/missing.json', JSON.stringify(missingJSON));
	fs.writeFileSync('missing/exists.json', JSON.stringify(existsJSON));
});