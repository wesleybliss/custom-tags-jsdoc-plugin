
var env = require('jsdoc/env')
var log = require('jsdoc/util/logger')

var config = env.conf.custom || {};


var getDefaultOpts = function(name) {
    return {
        mustHaveValue: false,
        canHaveType: false,
        canHaveName: false,
        isNamespace: false,
        onTagged: function(doclet, tag) {
            
            if (!doclet['custom']) doclet['custom'] = {};
            if (!doclet['custom'][name]) doclet['custom'][name] = {};
            
            // Assign actual tag data to this tag name
            doclet['custom'][name] = config.tags
                .map(t => {
                    
                    // Not the tag we're looking for, so leave it alone
                    if (t.name !== tag.originalTitle) return tag;
                    
                    // Remove tag opts - we don't need it for output
                    var strippedTag = Object.assign({}, t);
                    delete strippedTag.opts;
                    
                    // Copy JSDoc props to our custom props
                    strippedTag = Object.assign(strippedTag, tag);
                    
                    return strippedTag;
                    
                })
                .filter(t => t.name === tag.originalTitle)
                .pop();
            
            if (!doclet.meta) { doclet.meta = {}; }
            doclet.meta.partial = 'api-prop.tmpl';
            
        }
    };
}

if (!config.tags || config.tags.length < 1)
    throw new Error('Option config.tags is required');

config.tags.map(t => {
    if (!t.name || !t.label) throw new Error('Missing name or label for tag ' + t.name);
    if (!t.opts) t.opts = getDefaultOpts(t.name);
    return t;
});

exports.defineTags = function(dictionary) {
    
    for (var i in config.tags)
        dictionary.defineTag(config.tags[i].name, config.tags[i].opts);
    
};

exports.handlers = {
    
    processingComplete: function(e) {
        
        for (var i = 0; i < e.doclets.length; ++i) {
            
            var dl = e.doclets[i];
            
            for (var j in config.tags) {
                
                var name = config.tags[j].name;
                
                if (dl[name]) {
                    
                    if (!dl['custom']) dl['custom'] = {};
                    
                    dl['custom'][name] = config.tags[j];
                    
                }
                
            }
            
        }
        
    }
    
};
