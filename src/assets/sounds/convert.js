#!/bin/node
const fs = require('fs');
const files = fs.readdirSync('.');

files.forEach((fn) => {
    if (fn.indexOf('.wav') >= 0 && fn.indexOf('.js') === -1) {
        const contents = fs.readFileSync(fn, {encoding: 'base64'});
        const output = `/* eslint-disable */
/* base64 ${fn} */
const audio = "data:audio/wav;base64,${contents}";
export default audio;`;

        fs.writeFileSync([fn, '.js'].join(''), output);
    }
});


//
