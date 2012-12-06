Template-Monster
================

A small JavaScript library that loads in templates(unserscore.js, mustache.js, dust.js) asynchronously to reduce the amount of content your initial page has.

Check out the example_* files to see it in action.

Tips:

* Pass in a new filename to refresh the cache. Versioning.
    ```
        templateLoader.loadTemplates([
            {name: 'test1', filename: 'template.v1.html'}
        ]);
        // Days later you change the template...
        templateLoader.loadTemplates([
            {name: 'test1', filename: 'template.v2.html'}
        ]);
        // Forces the local storage version to refresh
    ```
    
