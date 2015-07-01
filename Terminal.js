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
		this.writeLine(output.slice(0, this.width - 2));
		this.writeLine(output.slice(this.width - 2));
		return;
	}

	var line = this.linesDom.appendChild(document.createElement("pre"));
	line.className = "line";
	line.innerText = output;
	line.textContent = output;
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
		line.textContent += "w";
	}

	this.width = (line.innerText || line.textContent).length - 1;
	this.linesDom.removeChild(line);
};

Terminal.prototype.execute = function execute (command) {
	var cmd = command.split(" ");
	this.actions[cmd[0].toLowerCase()].apply(this, cmd.slice(1));
};

Terminal.prototype.actions = {};
Terminal.prototype.actions.home = function home () {
	location = "http://www.coolestprojectlier.be";
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

Terminal.prototype.actions.info = function info () {
	this.writeLine(" ");
	this.writeLine("Coolest Project Lier is een beurs waar kinderen een scratch project kunnen voorstellen of meedoen met een robot wedstrijd. De doelgroep zijn kinderen van het middelbaar en kinderen van het 5de en 6de jaar van de lagere school.");
	this.writeLine(" ");

	this.writeLine("Het evenement bestaat uit twee onderdelen");
	this.writeLine(" ");

	this.writeLine("* Scratch Project Beurs");
	this.writeLine("Kinderen laten hun project waaraan ze gewerkt hebben zien aan de andere mensen op de beurs. De projecten worden ook beoordeeld door een jury en er worden een aantal awards uitgedeeld.");
	this.writeLine(" ");

	this.writeLine("* Robot Cup");
	this.writeLine("Robot wedstrijd met bracket eliminatie. Elke deelnemer maakt een robot waarop een ballon kan worden bevestigd. Het is dan de bedoeling de ballon van de tegenstrever kapot te maken.");
};