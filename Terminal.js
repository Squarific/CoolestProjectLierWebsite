function Terminal (container) {
	while (container.firstChild) container.removeChild(container.firstChild);
	container.className = "terminal-container";

	this.container = container;
	this.linesDom = container.appendChild(document.createElement("div"));
	this.getContainerWidth();
	if (this.width < 2) throw "Terminal too small";

	this.input = container.appendChild(document.createElement("input"));
	this.input.focus();

	this.input.addEventListener("blur", function () {
		this.input.focus();
	}.bind(this));

	this.input.addEventListener("keydown", function (event) {
		if (event.keyCode == 13) {
			this.execute(this.input.value);
			this.input.value = "";
		}
	}.bind(this));
}

Terminal.prototype.writeLine = function writeLine (output) {
	if (output.length >= this.width) {
		this.writeLine(output.slice(0, this.width - 1));
		this.writeLine(output.slice(this.width - 1));
		return;
	}

	var line = this.linesDom.appendChild(document.createElement("pre"));
	line.className = "line";
	line.innerText = output;
	this.linesDom.appendChild(document.createElement("br"));

	this.container.scrollTop = Infinity;
};

Terminal.prototype.getContainerWidth = function getContainerWidth () {
	// Add a line, then add characters untill the line does not become longer
	var line = this.linesDom.appendChild(document.createElement("pre"));
	line.className = "line";
	var prevWidth = -1;

	while (prevWidth < line.offsetWidth) {
		prevWidth = line.offsetWidth;
		line.innerText += "w";
	}

	this.width = line.innerText.length - 1;
	this.linesDom.removeChild(line);
};

Terminal.prototype.execute = function execute (command) {
	var cmd = command.split(" ");
	this.actions[cmd[0].toLowerCase()].apply(this, cmd.slice(1));
};

Terminal.prototype.actions = {};
Terminal.prototype.actions.home = function home () {
	location = "home.html";
};

Terminal.prototype.actions.help = function help () {
	this.writeLine(" ");
	this.writeLine(" ");
	this.writeLine("De volgende commando's zijn beschikbaar:");
	this.writeLine(" ");
	this.writeLine("home");
	this.writeLine("- Brengt je naar een gewone pagina");
	this.writeLine(" ");
	this.writeLine("help");
	this.writeLine("- Print deze help");
	this.writeLine(" ");
	this.writeLine("info");
	this.writeLine("- Print meer info over de coolest project");
};