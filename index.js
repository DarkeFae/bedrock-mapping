const yaml = require('js-yaml');
const fs = require('fs');
const input = 'input/items_ids_cache.yml';
const tmp = 'tmp/tmp.json';
const obj = yaml.load(fs.readFileSync(input, { encoding: 'utf8' }));

async function main() {
	await ymlToJSON();
	fs.readFile(tmp, 'utf8', (err, jsonString) => {
		if (err) {
			console.log("File read failed:", err);
			return;
		}
		var outputJSON = {}
		const object = JSON.parse(jsonString);
		for (let key in object) {
			outputJSON[key] = [];	
			for (let key2 in object[key]) {
				outputJSON[key].push({"custom_model_data": object[key][key2], "item_id": `bedrock/${key2.replace(":", "/")}.png`});
			}
		}
		fs.writeFileSync('output/sprites.json', JSON.stringify(outputJSON));
	})

}

async function ymlToJSON() {
	fs.writeFileSync(tmp, JSON.stringify(obj, null, 2));
}

main()