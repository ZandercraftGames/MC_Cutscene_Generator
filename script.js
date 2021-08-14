function newSection() {
	// Create div
	let div = document.createElement("div");
	div.setAttribute("id", "section-"+current);
	div.setAttribute("class", "content");

	// Create title
	let title = document.createElement("h3");
	title.textContent = "Section " + (current+1);
	div.appendChild(title);

	// Absolute coords input
	let absCoordsLabel = document.createElement("label");
	absCoordsLabel.textContent = "Go to (x,y,z):";
	div.appendChild(absCoordsLabel);

	let absCoords = [];
	for (let i = 0; i < 3; i++) {
		let field = document.createElement("input");
		field.setAttribute("class", "field");
		field.setAttribute("type", "number");
		field.setAttribute("value", "0");

		field.setAttribute("id", "abscoord-"+current+"-"+i);
		field.addEventListener("input", updateFromAbsoluteCoords);

		absCoords.push(field);
		div.appendChild(document.createTextNode(" "));
		div.appendChild(field);
	}

	div.appendChild(document.createElement("br"));
	div.appendChild(document.createElement("br"));

	// Relative coords input
	let relCoordsLabel = document.createElement("label");
	relCoordsLabel.textContent = "Move by (x,y,z):";
	div.appendChild(relCoordsLabel);

	let relCoords = [];
	for (let i = 0; i < 3; i++) {
		let field = document.createElement("input");
		field.setAttribute("class", "field");
		field.setAttribute("type", "number");
		field.setAttribute("value", "0");

		field.setAttribute("id", "relcoord-"+current+"-"+i);
		field.addEventListener("input", updateFromRelativeCoords);

		relCoords.push(field);
		div.appendChild(document.createTextNode(" "));
		div.appendChild(field);
	}

	div.appendChild(document.createElement("br"));
	div.appendChild(document.createElement("br"));

	// Absolute rotation input
	let absRotsLabel = document.createElement("label");
	absRotsLabel.textContent = "Look at (rx,ry):";
	div.appendChild(absRotsLabel);

	let absRots = [];
	for (let i = 0; i < 2; i++) {
		let field = document.createElement("input");
		field.setAttribute("class", "field");
		field.setAttribute("type", "number");
		field.setAttribute("value", "0");

		field.setAttribute("id", "absrot-"+current+"-"+i);
		field.addEventListener("input", updateFromAbsoluteRotations);

		absRots.push(field);
		div.appendChild(document.createTextNode(" "));
		div.appendChild(field);
	}

	div.appendChild(document.createElement("br"));
	div.appendChild(document.createElement("br"));

	// Absolute rotation input
	let relRotsLabel = document.createElement("label");
	relRotsLabel.textContent = "Rotate by (rx,ry):";
	div.appendChild(relRotsLabel);

	let relRots = [];
	for (let i = 0; i < 2; i++) {
		let field = document.createElement("input");
		field.setAttribute("class", "field");
		field.setAttribute("type", "number");
		field.setAttribute("value", "0");

		field.setAttribute("id", "relrot-"+current+"-"+i);
		field.addEventListener("input", updateFromRelativeRotations);

		relRots.push(field);
		div.appendChild(document.createTextNode(" "));
		div.appendChild(field);
	}

	div.appendChild(document.createElement("br"));
	div.appendChild(document.createElement("br"));

	// Time input
	let timeLabel = document.createElement("label");
	timeLabel.textContent = "Time (seconds):";
	div.appendChild(timeLabel);

	let timeField = document.createElement("input");
	timeField.setAttribute("class", "field");
	timeField.setAttribute("type", "number");
	timeField.setAttribute("value", "1");

	timeField.setAttribute("id", "time-"+current);

	div.appendChild(document.createTextNode(" "));
	div.appendChild(timeField);


	document.body.insertBefore(document.createElement("hr"), document.getElementById("content.morebutton"));
	document.body.insertBefore(div, document.getElementById("content.morebutton"));
	document.body.insertBefore(document.createElement("br"), document.getElementById("content.morebutton"));

	current++;
	updateStartCoords();
}

function updateStartCoords() {
	startCoords[0] = parseFloat(document.getElementById("startx").value);
	startCoords[1] = parseFloat(document.getElementById("starty").value);
	startCoords[2] = parseFloat(document.getElementById("startz").value);

	startCoords[3] = parseFloat(document.getElementById("startrx").value);
	startCoords[4] = parseFloat(document.getElementById("startry").value);

	updateFromRelativeCoords();
	updateFromRelativeRotations();
}

function updateFromRelativeCoords() {
	for (let section = 0; section < current; section++)
		for (let axis = 0; axis < 3; axis++) {
			if (section === 0)
				setFieldValue("abscoord-"+section+"-"+axis, startCoords[axis] + getFieldValue("relcoord-"+section+"-"+axis));
			else
				setFieldValue("abscoord-"+section+"-"+axis, getFieldValue("abscoord-"+(section-1)+"-"+axis) + getFieldValue("relcoord-"+section+"-"+axis));
		}
}

function updateFromAbsoluteCoords(e) {
	let section = parseInt(e.target.id.split("-")[1]);
	let axis = parseInt(e.target.id.split("-")[2]);
	for (let temp = section; temp <= section; temp++) {
		if (temp === 0)
			setFieldValue("relcoord-"+temp+"-"+axis, e.target.value - startCoords[axis]);
		else
			setFieldValue("relcoord-"+temp+"-"+axis, e.target.value - getFieldValue("abscoord-"+(temp-1)+"-"+axis));
	}

	updateFromRelativeCoords();
}

function updateFromRelativeRotations() {
	for (let section = 0; section < current; section++)
		for (let axis = 0; axis < 2; axis++) {
			if (section === 0)
				setFieldValue("absrot-"+section+"-"+axis, startCoords[axis+3] + getFieldValue("relrot-"+section+"-"+axis));
			else
				setFieldValue("absrot-"+section+"-"+axis, getFieldValue("absrot-"+(section-1)+"-"+axis) + getFieldValue("relrot-"+section+"-"+axis));
		}
}

function updateFromAbsoluteRotations(e) {
	let section = parseInt(e.target.id.split("-")[1]);
	let axis = parseInt(e.target.id.split("-")[2]);
	for (let temp = section; temp <= section; temp++) {
		if (temp === 0)
			setFieldValue("relrot-"+temp+"-"+axis, e.target.value - startCoords[axis+3]);
		else
			setFieldValue("relrot-"+temp+"-"+axis, e.target.value - getFieldValue("absrot-"+(temp-1)+"-"+axis));
	}

	updateFromRelativeRotations();
}

function getFieldValue(id) {
	let val = parseFloat(document.getElementById(id).value);
	if (isNaN(val)) return 0;
	return val;
}

function setFieldValue(id, val) {
	document.getElementById(id).value = val;
}

let current = 0;
let startCoords = [];

function generateFile() {
	if (current < 1) return;

	//Hardcoding is fun

	let zip = new JSZip();

	let id = getFieldValue("cutsceneid");

	// mcmeta file
	zip.file("pack.mcmeta", "{\"pack\":{\"pack_format\":5,\"description\":\"Cutscene datapack\"}}");

	let data = zip.folder("data");

	// tags for tick and load functions
	let tagFolder = data.folder("minecraft").folder("tags").folder("functions");
	tagFolder.file("tick.json", "{\"values\":[\"cutscene-" + id + ":tick\"]}");
	tagFolder.file("load.json", "{\"values\":[\"cutscene-" + id + ":load\"]}")

	// functions
	let functionsFolder = data.folder("cutscene-" + id).folder("functions");

	functionsFolder.file("tick.mcfunction", generateSections(id));
	functionsFolder.file("start.mcfunction", `scoreboard players set @s cutscenetimer-${id} 0 \ntp @s ${startCoords[0]} ${startCoords[1]} ${startCoords[2]} ${startCoords[3]} ${startCoords[4]}`);
	functionsFolder.file("load.mcfunction", `scoreboard objectives add cutscenetimer-${id} dummy`);
	functionsFolder.file("load.mcfunction", `scoreboard objectives add cutscenetimer-${id} dummy`);

	zip.generateAsync({type:"blob"})
		.then(function(content) {
			saveAs(content, "cutscene-" + id + ".zip");
	});
}

function section(dx, dy, dz, drx, dry, t) {

	this.dx = dx;
	this.dy = dy;
	this.dz = dz;
	this.drx = drx;
	this.dry = dry;
	this.t = t;
	console.log(t);

	this.generateCommand = function(start, id) {
		return `execute as @a[scores={cutscenetimer-${id}=${start+1}..${start+t}}] at @s run tp @s ~${dx/t} ~${dy/t} ~${dz/t} ~${drx/t} ~${dry/t}`;
	}

}

function generateSections(id) {
	let str = "scoreboard players add @a[scores={cutscenetimer-" + id + "=0..}] cutscenetimer-" + id + " 1\n";
	let timer = 0;

	let sections = [];

	for (let i = 0; i < current; i++) {
		let dx = getFieldValue("relcoord-" + i + "-0");
		let dy = getFieldValue("relcoord-" + i + "-1");
		let dz = getFieldValue("relcoord-" + i + "-2");
		let drx = getFieldValue("relrot-" + i + "-0");
		let dry = getFieldValue("relrot-" + i + "-1");

		let t = getFieldValue("time-" + i)*20;

		sections.push(new section(dx, dy, dz, drx, dry, t));

		str += sections[i].generateCommand(timer, id) + "\n";
		timer += t;
	}
	str += `scoreboard players set @a[scores={cutscenetimer-${id}=${timer}..}] cutscenetimer-${id} -1`

	return str;
}
