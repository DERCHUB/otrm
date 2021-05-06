/*
 /yNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
yMMMNdyyyyyyyyyyyyyydMMMyyyyyyyyyyyyyyyyyyydMNyyyyyyyyyyyyyyyyhNMMMdyyyyyyyyyyydMMdyyyyyyyyyyydMMMMM
MMMh.                -mM.                  +Md                 `+MM+            ::            oMMMMM
MMM:   +oooooooooo/   +Msoooooo+   .ooooooohMd   .ooooooooooo`   mM+   /ooooooo`   ooooooo:   oMMMMM
MMM-   mMMMMMMMMMMh   +MMMMMMMMm   -MMMMMMMMMd   :MMMMMMMMMMM-   dM+   yMMMMMMN`   MMMMMMMs   oMMMMM
MMM-   mMMMMMMMMMMh   +MMMMMMMMm   -MMMMMMMMMd   :MMMMMMMMMMM-   dM+   yMMMMMMN`   MMMMMMMs   oMMMMM
MMM-   mMMMMMMMMMMh   +MMMMMMMMm   -MMMMMMMMMd   :MMMNNNNNNNN-   mM+   yMMMMMMN`   MMMMMMMs   oMMMMM
MMM-   mMMMMMMMMMMh   +MMMMMMMMm   -MMMMMMMMMd   :MNs-.......  .sNM+   yMMMMMMN`   MMMMMMMs   oMMMMM
MMM-   mMMMMMMMMMMh   +MMMMMMMMm   -MMMMMMMMMd   :MNo........  .sMM+   yMMMMMMN`   MMMMMMMs   oMMMMM
MMM-   mMMMMMMMMMMh   +MMMMMMMMm   -MMMMMMMMMd   :MMMNmmmmmmm.   mM+   yMMMMMMN`   MMMMMMMs   oMMMMM
MMM-   mMMMMMMMMMMh   +MMMMMMMMm   -MMMMMMMMMd   :MMMMMMMMMMM-   dM+   yMMMMMMM:--:MMMMMMMs   oMMMMM
MMM-   mMMMMMMMMMMh   +MMMMMMMMm   -MMMMMMMMMd   :MMMMMMMMMMM-   dM+   yMMMMMMMMNNNMMMMMMMs   oMMMMM
MMM-   ossssssssss+   +MMMMMMMMm   -MMMMMMMMMd   :MMMMMMMMMMM-   dM+   yMMMMMMMMMMMMMMMMMMs   oMMMMM
MMMh`                .dMMMMMMMMm   -MMMMMMMMMd   :MMMMMMMMMMM-   dM+   yMMMMMMMMMMMMMMMMMMs   oMMMMM
yMMMNhssssssssssssssdNMMMMMMMMMNsssyMMMMMMMMMNssshMMMMMMMMMMMysssNMdsssmMMMMMMMMMMMMMMMMMMdsssdMMMMM
 /yNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM

 OPERATIONS TERMINAL SYSTEM SOFTWARE
 PROVIDED BY THE DEEPSPACE EXPLORATION AND RESOURCES COMMUNITY (DERC)
 HTTPS://GITHUB.COM/DERCHUB/OTRM
 HTTPS://DERC.LINK
*/

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
import OTRM from './otrm';
import React from 'react';
import ReactDOM from 'react-dom';
import {Widgets, Sounds, Fonts, Themes} from './const';
import './assets/fonts/default.woff.css';
import './assets/fonts/code.woff.css';

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
const render = (id, config, callback) => {
    ReactDOM.render(
        <OTRM
            config={config}
            callback={callback}
        />,
        document.getElementById(id)
    );
};

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
export {render, Widgets, Sounds, Fonts, Themes};

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
export default render;
