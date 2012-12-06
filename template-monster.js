(function(templateLoader, $, undefined){
	templateLoader.templates = {};
	
	templateLoader.loadTemplates = function(_templates){
		for(var template in _templates){
			templateLoader.loadTemplate(_templates[template]);
		}
	};
	function localStorageAvailable(){
       try {
          return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
          return false;
        }
    };
	function cache(data, callback){
		templateLoader.templates[data['name']] = data;
		callback(data);
	};
	templateLoader.loadTemplate = function(templateInfo){
		var name = templateInfo['name'];
		var filename = templateInfo['filename'];
		var callback = templateInfo['callback'] || function(data){};
		
		/* Check that it's not already loaded! */
		//console.log(templateLoader.templates);
		if (templateLoader.templates[name] && templateLoader.templates[name]['filename'] == filename){
			console.log("Already in cache");
			callback(templateLoader.templates[name]);
			return;
		}
		/* Checks local storage, if it's there does a version check otherwise pull from server */
		console.log("Loading: " + name + " " + filename);
		if (localStorageAvailable()){
			var data = localStorage.getItem(name);
			data = data && JSON.parse(data);
			if (data && data['filename'] && data['filename'] === filename){
				console.log("Returning local storage version");
				cache(data, callback);
				return;
			}
		}
		//Pull from server
		jQuery.get(filename, function(data) {
			console.log("Pulling from server");
			var obj = {name:name, filename:filename, data:data};
			cache(obj, callback);
			saveTemplate(obj);
		});
	};
	function saveTemplate(data){
		//templateLoader.templates[name] = obj;
		if (localStorageAvailable()){
			console.log("Saving local storage: " + data['name']);
			localStorage.setItem(data['name'], JSON.stringify(data));
		}
	};
})(window.templateLoader = window.templateLoader || {}, jQuery);