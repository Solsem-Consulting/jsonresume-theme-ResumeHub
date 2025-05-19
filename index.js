var fs = require("fs");
var path = require('path');
var Handlebars = require("handlebars");

function render(resume) {
	var css = fs.readFileSync(__dirname + "/styles/style.css", "utf-8");
    console.log("css");
    console.log(css);
	
	var tpl = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");
	console.log("tpl");
	console.log(tpl);
	
	var partialsDir = path.join(__dirname, 'partials');
	if (!fs.existsSync(partialsDir)) {
		console.error("Partials directory does not exist: " + partialsDir);
		return;
	}
	console.log("partialsDir");
	console.log(partialsDir);
	
	var filenames = fs.readdirSync(partialsDir);
	if (!filenames) {
		console.error("No partials found in directory: " + partialsDir);
		return;
	}
	console.log("filenames");

	filenames.forEach(function (filename) {
		console.log(filename);
	  var matches = /^([^.]+).hbs$/.exec(filename);
	  if (!matches) {
	    return;
	  }
	  var name = matches[1];
	  var filepath = path.join(partialsDir, filename)
	  console.log(filepath);
	  var template = fs.readFileSync(filepath, 'utf8');
	  console.log(template);

	  Handlebars.registerPartial(name, template);
	});
	return Handlebars.compile(tpl)({
		css: css,
		resume: resume
	});
}

module.exports = {
	render: render
};