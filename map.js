const exp = require('constants');
const fs = require('fs');
function map() {
	// Read the sprites.json file
	fs.readFile('output/tmp.json', 'utf8', (err, spritesJsonString) => {
		if (err) {
			console.log("File read failed:", err);
			return;
		}

		// Parse the sprites.json
		const spritesData = JSON.parse(spritesJsonString);

		// Read the map/map.json file
		fs.readFile('map/map.json', 'utf8', (err, mapJsonString) => {
			if (err) {
				console.log("File read failed:", err);
				return;
			}

			// Parse the map/map.json
			const mapData = JSON.parse(mapJsonString);

			let missingItems = {};
			let foundItems = {};

			// Iterate over the keys in the spritesData object
			for (let key in spritesData) {
				missingItems[key] = [];
				foundItems[key] = [];

				// Iterate over the items in the array
				for (let spriteItem of spritesData[key]) {
					let found = false;

					// Iterate over the keys in the mapData object
					for (let mapKey in mapData) {
						// Iterate over the items in the array
						for (let mapItem of mapData[mapKey]) {
							// Get the part after the final slash in mapItem.item_id
							let mapItemIdPart = mapItem.item_id.substring(mapItem.item_id.lastIndexOf('/') + 1);
							// Get the part after the final slash in spriteItem.item_id
							let spriteItemIdPart = spriteItem.item_id.substring(spriteItem.item_id.lastIndexOf('/') + 1);

							// If the spriteItem's item_id matches mapItemIdPart
							if (mapItemIdPart === spriteItemIdPart) {
								// Replace the spriteItem's item_id with the mapItem's item_id
								spriteItem.item_id = mapItem.item_id;
								found = true;
								break;
							}
						}

						if (found) break;
					}

					// If the spriteItem's item_id was found in map/map.json, add it to foundItems
					if (found) {
						foundItems[key].push(spriteItem);
					} else {
						// If the spriteItem's item_id was not found in map/map.json, add it to missingItems
						missingItems[key].push(spriteItem);
					}
				}
			}

			// Write the missing items to missing/test.json
			fs.writeFile('missing/test.json', JSON.stringify(missingItems, null, 2), (err) => {
				if (err) throw err;
				console.log('Missing items written to missing/test.json');
			});

			// Write the found items to missing/found.json
			fs.writeFile('output/sprites.json', JSON.stringify(foundItems, null, 2), (err) => {
				if (err) throw err;
				console.log('Found items written to missing/found.json');
			});
		});
	});
}

module.exports = map;