
cat /proc/sys/vm/swappiness


Network & Hacking Series
- netstat

netstat -pawnt 2>/dev/null | grep 3001 | awk '{ print $7 }'





Parse SDK: The Lost Bits (unofficial)
- Diverging between Cloud Code
- Syntax, WTF?
- Swagger API Wrapper
- Login flow
- Browserify


Write about JADE template strategies
	- https://github.com/jossmac/jade-field-mixins

# Competeing platforms
	https://www.google.com/trends/explore#q=%2Fm%2F02p97%2C%20%2Fm%2F06ff5%2C%20%2Fm%2F09gbxjr%2C%20%2Fm%2F060kv%2C%20%2Fm%2F0chpd&date=1%2F2013%2027m&cmpt=q&tz=
US Trend:
<script type="text/javascript" src="//www.google.com/trends/embed.js?hl=en-US&q=/m/02p97,+/m/06ff5,+/m/09gbxjr,+/m/060kv,+/m/0chpd&geo=US&date=9/2011+43m&cmpt=q&tz&tz&content=1&cid=TIMESERIES_GRAPH_0&export=5&w=500&h=330"></script>

Code Rot Article

Gulp Grunt Organization Ideas

Learn SmallTalk!

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



#### The Real Cost Of IE7 and IE8


