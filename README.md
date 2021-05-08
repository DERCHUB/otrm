![logo](https://github.com/DERCHUB/otrm/blob/master/docs/otrm.png?raw=true)

# Operations Terminal System Software

Terminals are used every day by many citizens throughout the UEE populated systems and provide services around trade, shopping and various other interactions. Terminals have become the center piece of modern society and are designed to provide a frictionless experience and rapid information presentation to our citizens. 

The Operations Terminal System Software or OTRM is a full solution to build and operate custom terminal implementations for your organizations and community. 

---

# Video Introduction

A quick introduction into OTRM https://www.youtube.com/watch?v=HWzaeq7kUR0

---

# Basic Terminals

A basic terminal can be run in a simple HTML container. Just include the following library in your document and use the `OTRM.render` method to get started. We prepared an example in the `example/` folder to get you started right away.

Checkout the video above and the tutorial at [/docs/howto-terminal-from-scratch.md](https://github.com/DERCHUB/otrm/blob/master/docs/howto-terminal-from-scratch.md)

```html
<script src="https://cdn.jsdelivr.net/npm/otrm/dist/otrm.bundle.js"></script>
```

```html
<script>
    OTRM.render("root", {
        name: "Basic Terminal"
    })
</script>
```

Use the next sections to learn more about our configuration options. 


---

# Advance Terminals

Recommended for advance terminals that may require additional functionality.

This guide expects that you have an understanding of REACT (an old technology) and how to use it. You may be able to access this "website" to learn more about it: https://reactjs.org 

We have prepared a starter terminal which can be installed as followed and can be found here https://github.com/DERCHUB/otrm-starter 

```
git clone git@github.com:DERCHUB/otrm-starter.git && cd otrm-starter && yarn 
```

Please refer to the next sections to learn more about how to configure and use OTRM.

---

# Antonomy 

![theme-otrm](https://github.com/DERCHUB/otrm/blob/master/docs/otrm-theme-otrm.png?raw=true)

OTRM is split into two sections: Navigation and Pages. 

The `Navigation` allows to select a specific page within the terminal while the `Page` can be split into `Content` parts. Each `Content` part is split by itself in `Sections` allowing to create various representation models while keeping the overal experience on point.

Checkout built-in themes at [/docs/themes.md](https://github.com/DERCHUB/otrm/blob/master/docs/themes.md)



--- 

# Configuration

OTRM runs off a configuration that is either defined inline or can be defined outside. The configuration has extended features and can control any aspect of the terminal.

```
Please refer to the starter terminal config.js to learn more in detail what each options means
```

In general the configuration is divided into multiple parts:

### General 

The general configuration includes such things a the `name`, `tagline` or `logo` of your Terminal implemention.

### Login

The `login` key defines how the login screen should be displayed. Login screens are important as they automatically read the biometric information of the citizen which is instantly syncronized with the UEE data servers in their specific region.

### Navigation

The `navigation` key defines the header navigation and how it appears. Use the Navigation to direct your citizens to pages, modules or open another terminal (or website).

The `navigation` key includes an `items` section which allows you to add these. 

Each item contains two sub keys: `name` describes the label to be displayed in the navigation bar. You also need to specify on of the actions `open` or `page`.

`open` opens another terminal (or website) while `page` is used to link to a internal page that can be defined in `pages`.

```js
navigation: {
    items: [
        {
            name: "Trade",
            page: "trade",
        },
        {
            name: "DERC",
            open: "http://derc.link"
        }
    ]
}
```

### Pages

The `pages` key defines the individual display areas. Each page needs to be uniquely named and is divided into `columns` and `sections`. 

Each column needs to specify a size but the sum of all column sizes can not exceed `12`. For example: Two equal columns would be each of size `6` while a three column layout could follow the `2-5-5` rule.  

The below example represents the example screen from above:

```js
pages: {
    root: {
        root: true,
        columns: [
            {
                size: 4,
                ...
            },
            {
                size: 8,
                ...
            }
        ]
    }
}
```

The `sections` key of a `column` allows to create various separte content areas which can configured with `widgets`. 

#### Widgets

Widgets are the main drivers of content. There are multiple internal widgets available as long with some distinctive. As time progresses more widgets will be added.

##### Title 

A title.

```js
{
    title: "Title"
}
```

##### Subtitle

A subtitle.

```js
{
    subtitle: "Subtitle"
}
```

##### Text

Normal text

```js
{
    text: "A paragraph of text"
}
```

##### Action

A action button used to either change navigation or open another terminal (website).

```js
{
    action: "Ship Loadout Manager",
    open: "https://erkul.games/",
}
```

```js
{
    action: "Another Page",
    page: "page01",
}
```

##### Image

Displays an image.

```js
{
    widget: Widgets.Image, // or just "image"
    image: 'https://i.imgur.com/Sk8DWNY.jpg',
}
```

##### Video

Displays an video. Only the old YouTube is supported at the moment.

```js
{
    widget: Widgets.Video, // or just "video"
    video: 'lkl56r0Ad2A',
    autoplay: false, // true for automatic play
}
```

##### Markdown

Displays a markdown file.

```js
{
    widget: Widgets.Markdown, // or just "markdown"
    source: 'content/history.md',
}
```

### Other Keys

There are other keys available like `sounds`, `styles`, etc. Please refer to the `config.js` how to use them.

---

# Brief History of the Terminal

## 1990 - 2100
At the end of the 20th century the first interconnected network was created on the planet Earth which later developed into the so called "Internet". Adaption quickly happened on a global level and various communication solutions were created. Information exchange usually happened on so called "websites" and there was a competitive market between them.

In the early days of the 21st century so called "social media sites" dominated the public and private life. Multiple attempts of the companies behind those sites to take over the governmental process ended abruptly when in 2052 the "Regulated Information Law" was created. Most of those companies vanished shortly after. 

## 22nd century
In the middle of the 22nd century humans started to explore the sol system and quickly discovered that their old form of information presentation is no longer doable. 

Inspired by modern space craft user interfaces, soon a trend developed that focused only on the required information. The first Terminal was born. However the early Terminals were still constrained by old communication technologies and philosophies. Early Terminals looked very similar to their 21st century counterparts of websites containing a high amount of advertisment and operated 

At the end of the 22nd century an engineer named Arnes Lark came up with a new concept using sub space to transmit information. First prototypes were promising allowing to transmit information almost instantly throught the entire sol system. As time progressed Lark's implementations were found to become the standard in communication and security.

## 23rd century

That however changed when in 2371 when a group of hackers out of the Centauri system successfully were able to change subspace communication packages. They quickly manipulated the markets throughout many human inhabited systems creating havoc in almost everything. Communication at that time was still regarded as a commercial endevaour and jurisdication was scattered. This single event lead eventually to the creation of the United Nations of Earth (UNE) just nine years later.

The UNE quickly imposed standardization throughout the systems on all human habited worlds which once again lead to a revolution of technological design and adaption. The Terminal concept became more widespread as space farer requested to have access to their information everywhere in UNE controlled space.

## 24th - 29th century

Throughout the centuries many forms of Terminals developed. At around 2874 a new design scheme was introduced by the DeepSpace Exploration and Resources Community also known as DERC. They called it the Operations Terminal System Software or OTRM.

DERC and it's members were operating on many locations throughout the habitated worlds and eventually found themselves in need of having a universal systems across all locations available - allowing their members to access their personal and commercial data in trusted places. 

OTRM was simple in the beginning but eventually used by the UEE as blueprint across all corporations and affiliates.

## 30th century

In 2951 DERC released with the blessing of the UEE the OTRM software to the all citizens and organizations allowing them to build and create their own terminal implementions using the same trusted standards that have been employed for over a hundred years. 