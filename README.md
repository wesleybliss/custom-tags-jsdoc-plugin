# Custom Tags for JSDoc

JSDoc provides a nice interface to add custom tags, but it's a bit tedius to define a plugin + template just for a few.

This plugin lets you define arbitrary custom tags that will be included in your generated docs.


## Installation

```shell
$ cd /path/to/your-app-root
$ npm i --save-dev https://github.com/wesleybliss/custom-tags-jsdoc-plugin.git
```
### Dependencies

You must use a template that supports arbitrary custom tags. For now, that's just my modified version of [Minami with arbitrary custom tags](https://github.com/wesleybliss/minami.git).


## Usage

Include the plugin, and specify your tags list in the `api` object.
Each tag must have a name & label, and can have an optional settings object.
See the [JSDoc documentation](http://usejsdoc.org/about-plugins.html#tag-definitions) for tag options.

#### Example **.jsdoc.json**

```json
{
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc"]
    },
    "source": {
        "include": ["src", "package.json", "README.md"],
        "includePattern": ".js$",
        "excludePattern": "(node_modules/|docs)"
    },
    "plugins": [
        "plugins/markdown",
        "node_modules/custom-tags-jsdoc-plugin"
    ],
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": true,
        "useLongnameInNav": false
    },
    "opts": {
        "destination": "./docs/",
        "encoding": "utf8",
        "private": true,
        "recurse": true,
        "template": "node_modules/minami"
    },
    "api": {
        "tags": [
            { "name": "endpoint", "label": "Endpoint:" },
            { "name": "requiresToken", "label": "Requires Token:" },
            { "name": "requiresAuth", "label": "Requires Authentication:" }
        ]
    }
}
```


## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request


## History

Initial creation.


## Credits

**Minami**
*https://github.com/nijikokun/minami*
Great, minimal JSDoc template that I used a lot for debugging while creating this plugin.


## License

N/A