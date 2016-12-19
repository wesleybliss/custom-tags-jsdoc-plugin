
var env = require('jsdoc/env')
var log = require('jsdoc/util/logger')

var config = env.conf.api || {};


var getDefaultOpts = function(name) {
    return {
        mustHaveValue: false,
        canHaveType: false,
        canHaveName: false,
        isNamespace: false,
        onTagged: function(doclet, tag) {
            
            doclet[name] = tag;
            
            if (!doclet.meta) { doclet.meta = {}; }
            doclet.meta.partial = 'api-prop.tmpl';
            
        }
    };
}

if (!config.tags || config.tags.length < 1)
    throw new Error('Option config.tags is required');

config.tags.map( t => {
    if (!t.name || !t.label) throw new Error('Missing name or label for tag ' + t.name);
    if (!t.opts) t.opts = getDefaultOpts(t.name);
    return t;
});

exports.defineTags = function( dictionary ) {
    
    for ( var i in config.tags )
        dictionary.defineTag( config.tags[i].name, config.tags[i].opts );
    
};

exports.handlers = {
    
    processingComplete: function(e) {
        
        for (var i = 0; i < e.doclets.length; ++i) {
            
            var dl = e.doclets[i];
            
            for ( var j in config.tags ) {
                
                var name = config.tags[j].name;
                
                if ( dl[name] )
                    dl[name] = ' <i>' + dl[name].value + '</i>';
                
            }
            
        }
        
    }
    
};
