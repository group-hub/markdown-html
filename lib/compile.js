var marked = require('marked');
var path = require('path');
var fs = require('fs');
var mustache = require('mu2');

module.exports = function (argv, md) {
    var tokens = marked.lexer(md);

    // Set title.
    var title = path.basename(argv._[0], path.extname(argv._[0]));
    for (var i = 0; i < tokens.length; i += 1) {
        if (tokens[i].type === 'heading') {
            title = tokens[i].text;
            break;
        }
    }
    if (argv.title) {
        title = argv.title;
    }

    content = marked.parser(tokens);

    // Output
    var out = process.stdout;
    if (argv['output-file']) {
        out = fs.createWriteStream(path.resolve(argv['output-file']));
    }

    // Compile template and pipe it out.
    mustache.compileAndRender(argv.template, {
        content: content
    }).pipe(out);
};
