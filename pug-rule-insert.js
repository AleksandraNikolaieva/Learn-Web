/**
 * Adds the pug-loader inside Angular CLI's webpack config, if not there yet.
 * @see https://github.com/danguilherme/ng-cli-pug-loader
 */
const fs = require('fs');
const commonCliConfig = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/common.js';
const pugRule = `\n{ test: /.(pug|jade)$/, use: [ 'html-loader', 'pug-html-loader'] },`;

fs.readFile(commonCliConfig, (err, data) => {
    if (err) {
        throw err;
    }

    const configText = data.toString();

    // Make sure we don't add the rule if it already exists
    if (configText.indexOf(pugRule) > -1) {
        return;
    }

    // We made it this far, let's insert that pug webpack rule
    const position = configText.indexOf('rules: [') + 8;
    const output = [configText.slice(0, position), pugRule, configText.slice(position)].join('');
    const file = fs.openSync(commonCliConfig, 'r+');

    fs.writeFile(file, output, (err) => {
        if (err) throw err;

        fs.close(file, (err) => {
            if (err) throw err;
        });
    });
});