#!/bin/node
const fs = require('fs');
const files = fs.readdirSync('.');

files.forEach((fn) => {
    if (fn.indexOf('.woff') >= 0 && fn.indexOf('.css') === -1) {
        const contents = fs.readFileSync(fn, {encoding: 'base64'});
        const [name] = fn.split('.');
        const output = `@font-face {
font-family: 'OTRM-${name.toUpperCase()}';
src: url(data:font/woff;charset=utf-8;base64,${contents}) format('woff');
font-weight: normal;
font-style: normal;
font-display: swap;
}
        `;

        fs.writeFileSync([fn, '.css'].join(''), output);
    }
});


//
