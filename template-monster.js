(function(templateLoader){
  templateLoader.templates = {};

  templateLoader.getTemplate = function(name){
    if (templateLoader.templates[name] && templateLoader.templates[name]['data']){
      return templateLoader.templates[name]['data'];
    }
    /* Check to see if the template is on the page and load it in? */
    return null;
  };

  templateLoader.loadTemplates = function(_templates){
    for(var template in _templates){
      templateLoader.loadTemplate(_templates[template]);
    }
  };

  templateLoader.loadTemplate = function(templateInfo){
    var name = templateInfo['name'];
    var filename = templateInfo['filename'];
    var callback = templateInfo['callback'] || function(data){};
    
    if (templateLoader.templates[name] && 
        templateLoader.templates[name]['filename'] == filename){
      callback(templateLoader.templates[name]);
      return;
    }
    if (localStorageAvailable()){
      var data = localStorage.getItem(name);
      data = data && JSON.parse(data);
      if (data && data['filename'] && data['filename'] === filename){
        cache(data, callback);
        return;
      }
    }

    $.get(filename, function(data) {
      var obj = {name:name, filename:filename, data:data};
      cache(obj, callback);
      saveTemplate(obj);
    });
  };

  function localStorageAvailable(){
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    }catch (e){
      return false;
    }
  };

  function cache(data, callback){
    templateLoader.templates[data['name']] = data;
    callback(data);
  };

  function saveTemplate(data){
    if (localStorageAvailable()){
      localStorage.setItem(data['name'], JSON.stringify(data));
    }
  };
})(window.templateLoader = window.templateLoader || {});
