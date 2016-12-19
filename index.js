
var env = require('jsdoc/env')
var log = require('jsdoc/util/logger')

var config = env.conf.api || {};


var getDefaultOpts = function(tagName) {
    return {
        mustHaveValue: false,
        canHaveType: false,
        canHaveName: false,
        isNamespace: false,
        onTagged: function(doclet, tag) {
            
            doclet[tagName] = tag;
            
            if (!doclet.meta) { doclet.meta = {}; }
            doclet.meta.partial = 'api-prop.tmpl';
            
        }
    };
}

if (!config.tags || config.tags.length < 1)
    throw new Error('Option config.tags is required');

config.tags.map( t => {
    if (!t.tag || !t.label) throw new Error('Missing label for tag ' + t.tag);
    if (!t.opts) t.opts = getDefaultOpts(t.tag);
    return t;
});

exports.defineTags = function( dictionary ) {
    
    for ( var i in config.tags )
        dictionary.defineTag( config.tags[i].tag, config.tags[i].opts );
    
};

exports.handlers = {
    
    processingComplete: function(e) {
        
        for (var i = 0; i < e.doclets.length; ++i) {
            
            var dl = e.doclets[i];
            
            for ( var j in config.tags ) {
                var tag = config.tags[j];
                if ( dl[tag.tag] ) {
                    dl[tag.tag] = ' <i>' + dl[tag.tag].value + '</i>';
                }
            }
            
        }
        
    }
    
};