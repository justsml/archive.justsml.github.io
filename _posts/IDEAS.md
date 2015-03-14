Write about JADE template strategies
	- https://github.com/jossmac/jade-field-mixins

Code Rot Article

Gulp Grunt Organization Ideas 

#### OMFG, angular-hint
	npm install angular-hint

Ask module authors to automatically measure deps size including 
	- un/minified
	- un/gziped

Bootstrap resources"
	- http://www.bootply.com/tagged/flexbox


3 Critical Grunt Practices
	IMPLEMENT SUPPORT FOR:
	SEE: http://dontkry.com/posts/code/grunt-tricks.html#configuring-tasks-dynamically
	rename: function(dest, src) {
		var path = require('path');

		// Get the name of the component folder (or first folder in src path)
		var component = src.split(path.sep).slice(0, 1)[0];

		// Prefix each javascript file with the
		// component folder name into the destination
		return path.join(dest, component + '_' + path.basename(src));
	}