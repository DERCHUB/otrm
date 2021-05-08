
# HOWTO - Create a Terminal from Scratch

This guide will show you how to create a terminal app using OTRM from scratch. This guide expects you to have some knowledge of `javascript`, `react` and a fully working `node` environment.

Watch this video to see it in action: https://www.youtube.com/watch?v=HWzaeq7kUR0

## (Step 1) Create the app

Get started by creating a new project with `npx creact-react-app <name of your terminal>`

## (Step 2) Prepare your code

Remove all files in `src/` and create two a `index.js` and `config.js` file. 

Execute the command below to add the `OTRM` package to your app.

```
yarn add otrm 
```

## (Step 3) Add your terminal code

Paste the following contents to your `index.js`:

```js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import OTRM from "otrm"
import config from "./config";

ReactDOM.render(
  <React.StrictMode>
    <OTRM
      config={config}
    />
  </React.StrictMode>,
  document.getElementById('root')
);
```

## (Step 4) Create your configuration

Copy and paste this to your `config.js`:

```js
const config = {
    name: "My Terminal",
    tagline: "My Operational Terminal",
    pages: {
        // The root/home page.
        root: {
            root: true,
            columns: [
                {
                    size: 4,
                    sections: [
                        [
                            {
                                title: "Resources"
                            },
                            {
                                action: "Ship Loadout Manager",
                                open: "https://erkul.games/",
                            },
                            {
                                action: "Trading Manager",
                                open: "https://uexcorp.space/trade",
                            },
                            {
                                action: "Mining Manager",
                                open: " https://uexcorp.space/mining",
                            },
                            {
                                action: "RSI",
                                open: "https://robertsspaceindustries.com/enlist?referral=STAR-ZNGN-MG6X",
                            },
                        ],
                        [
                            {
                                title: "Welcome",
                            },
                            {
                                text: "This is our Terminal",
                            },
                        ],
                        [
                            {
                                title: "Picture of the Day",
                            },
                            {
                                widget: Widgets.Image,
                                image: 'https://i.imgur.com/Sk8DWNY.jpg',
                            },
                        ],
                    ]
                },
                {
                    size: 8,
                    centered: true,
                    noSectionPadding: true,
                    sections: [
                        [
                            {
                                widget: Widgets.Logo,
                            },
                        ]
                    ],
                }
            ]
        },
    }
}

export default config;
```

## (Step 5) Run it

Start the terminal with the command `yarn start` and this is it. Happy Coding!