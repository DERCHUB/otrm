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

//

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// This is the default configuration and important as it declares a minimal viable version of the terminal.
// Any changes should be made in the host application\import Logo from './assets/logo/otrm-white.svg';
import Logo from './assets/logo/otrm-white.svg';
import {Sounds} from './const';
import SoundStartup from './assets/sounds/startup.wav.js';
import SoundEnter from './assets/sounds/enter.wav.js';
import SoundExit from './assets/sounds/exit.wav.js';
import SoundHover from './assets/sounds/hover.wav.js';

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
const Config = {
    // A version indicating the current terminal configuration revision.
    version: 0,
    // The name of the organization/community using the terminal. Not used at the moment.
    organization: 'OTRM',
    // This will be displayed on the top left corner of the terminal.
    name: 'Terminal',
    // A tagline - used for the login screen and logo widget.
    tagline: 'Operations Terminal',
    // A logo - used for the login screen and logo widget.
    logo: Logo,
    // \\//\\//\\//\\//\\//\\
    // Login page
    login: {
        // Enables the login screen
        enabled: true,
        // Enables the logo on the login screen
        logo: true,
        // Enables the tagline on the login screen. This also accepts a string for a custom message.
        tagline: true,
        // The label displayed of the default action/button on the login page.
        action: 'ENTER TERMINAL',
        // Additional actions displayed on the login page.
        actions: false,
    },
    // \\//\\//\\//\\//\\//\\
    // Navigation
    navigation: {
        // Shows the time on the right side of the navigation.
        showTime: true,
        // Shows the date on the right side of the navigation.
        showDate: true,
        // Enables a root/home action in the navigation.
        rootEnabled: true,
        // The label for the root/home action.
        rootLabel: 'root',
        // Enables a logout action in the navigation.
        logoutEnabled: true,
        // The label for the logout action/
        logoutLabel: 'exit',
        // A list of additional navigation items.
        items: [],
    },
    // \\//\\//\\//\\//\\//\\
    // Pages
    pages: {
    },
    // \\//\\//\\//\\//\\//\\
    // Sounds
    sounds: {
        [Sounds.Startup]: SoundStartup,
        [Sounds.Enter]: SoundEnter,
        [Sounds.Exit]: SoundExit,
        [Sounds.Hover]: SoundHover,
    },
    // \\//\\//\\//\\//\\//\\
    // Styles
    styles: {
        fontWeight: 'normal',
        textColor: '#FFFFFF',
        textInvertedColor: '#000000',
        background: 'linear-gradient(0deg, #000000, #333333)',
        scrollbarColor: 'rgba(255, 255, 255, 0.5)',
        linkColor: 'rgba(255, 255, 255, 0.5)',
        borderColor: 'rgb(255, 255, 255)',
        borderSize: 2,
        margin: 10,
        padding: 10,
        versionDistance: 20,
        headerBackground: 'rgba(255, 255, 255, 0.9)',
        headerTextColor: '#000000',
        headerItemDividerWidth: 3,
        headerButtonBackground: 'rgba(255, 255, 255, 0.5)',
        headerButtonTextColor: '#000000',
        actionButtonTextColor: '#000000',
        actionButtonBackground: 'rgba(255, 255, 255, 0.9)',
        actionButtonBorderColor: '#FFFFFF',
        actionButtonBorderSize: 3,
        actionButtonBorderDistance: 3,
        actionButtonBorderRadius: 3,
        invertedBackgroundColor: 'rgb(246, 246, 246)',
        invertedTextColor: '#000000',
        invertedBorderRadius: 3,
        listItemDistance: 25,
        listItemMargin: 20,
        listItemBackground: 'rgba(0, 0, 0, .2)',
        listItemBorder: '3px solid rgba(255, 255, 255, 0.5)',
        listItemSelectedBackground: 'rgba(0, 0, 0, 0.4)',
        listItemSelectedBorder: '3px solid rgba(255, 255, 255, 0.8)',
        listItemBorderRadius: 5,
        listItemFontSize: '1vw',
        listItemImageSize: '10vw',
        listItemImageBorder: '1px solid rgba(255, 255, 255, 0.25)',
        listItemHighlightTextColor: 'rgba(255, 255, 255, 0.7)',
        listItemHighlightBorder: '1px solid rgba(255, 255, 255, 0.7)',
        listItemHighlightBorderRadius: 3,

        boxSizing: 'border-box',
    },
    // \\//\\//\\//\\//\\//\\
    // Overwrites for real hacking
    overwrites: {
        acID: 'AC',
        adjustedYears: 930,
        adjustedTimezone: 'UET',
        useLocalTime: false,
    },
};

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
export default Config;
