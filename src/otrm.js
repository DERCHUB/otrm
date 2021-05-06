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
PROVIDED BY THE DEEPSPACE EXPLORATION AND RESOURCES COMMUNITY
GITHUB.COM/DERCHUB/OTRM
*/

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\s
import React, { Fragment, memo, useEffect, useState } from 'react';
import { makeStyles, ThemeProvider, createMuiTheme, CssBaseline, Grid } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { format, addMinutes } from 'date-fns';
import { version as PackageVersion } from '../package.json';
import { StoreProvider } from './store';
import Widget, { InitializeWidgets } from './widgets';
import DefaultConfig from './config';
import { Widgets, Sounds, Fonts } from './const';
import { merge, makeLink } from './lib';

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
const bakeTheme = ({ styles }) => createMuiTheme({
    typography: {
        fontFamily: `'OTRM-${styles.fontName || Fonts.Default}', sans-serif`,
        fontSize: 10,
    },
    palette: {
        type: 'dark',
        background: {
            default: '#000000',
        },
        primary: {
            main: styles?.textColor,
        },
        secondary: {
            main: styles?.textInvertedColor,
        },
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '*::-webkit-scrollbar': {
                    width: '0.5vw',
                },
                '*::-webkit-scrollbar-track': {
                    background: 'transparent',
                },
                '*::-webkit-scrollbar-thumb': {
                    outline: 'none',
                    backgroundColor: styles?.scrollbarColor,
                    borderRadius: styles?.columnBorderRadius,
                },
            },
        },
    },
});

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
const bakeDefaults = ({ styles }) => ({
    border: `${styles.borderSize}px ${styles.borderStyle || 'solid'} ${styles.borderColor}`,
});

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
const bakeStyles = ({ styles, defaults }) => makeStyles(() => ({
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        width: '100vw',
        height: '100vh',
        userSelect: 'none',
        background: styles.background,
        color: styles.textColor,
        fontWeight: styles.fontWeight,
        /* Works on Firefox */
        '& a': {
            textDecoration: 'none',
            color: `${styles.linkColor}!important`,
        },
        '& h2': {
            textTransform: 'uppercase',
            padding: 0,
            margin: styles.margin,
            marginBottom: styles.margin * 2,
            fontSize: '1.2vw',
            opacity: 0.8,
            fontWeight: 'normal',
            textAlign: 'left',
        },
        '& h3': {
            textTransform: 'uppercase',
            padding: 0,
            opacity: 0.7,
            margin: styles.margin * 2,
            fontSize: '1vw',
            fontWeight: 'normal',
            textAlign: 'left',
        },
        '& h4': {
            textTransform: 'uppercase',
            padding: 0,
            opacity: 0.9,
            margin: styles.margin,
            fontSize: '1.5vw',
            fontWeight: 'normal',
            textAlign: 'center',
        },
        '& p': {
            margin: styles.margin * 2,
            fontSize: '0.9vw',
        },
        '& img': {
            display: 'block',
            margin: '0 auto',
        },
        '& .Video-container-shell': {
            margin: styles.margin,
        },
        '& .Video-container': {
            position: 'relative',
            width: '100%',
            height: 0,
            paddingBottom: '56.25%',
            overflow: 'hidden',
        },
        '& .Video-container iframe': {
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
        },
        '& .Image-container-shell': {
            margin: styles.margin,
            '& img': {
                width: '100%',
                height: 'auto',
                position: 'relative',
                overflow: 'hidden',
            },
        },
    },
    version: {
        color: styles.versionTextColor || 'inherit',
        background: styles.versionBackground || 'transparent',
        fontSize: '0.8vw',
        textTransform: 'uppercase',
        opacity: styles.versionOpacity || 0.5,
        textAlign: 'center',
        paddingTop: styles.padding,
        paddingBottom: styles.versionDistance || 0,
        '& span': {
            display: 'inline-block',
            position: 'relative',
            top: -1 * 0.8 * styles.margin,
            paddingLeft: styles.padding,
            paddingRight: styles.padding,
        },
        height: 20,
    },
    versionLine: {
        borderTop: styles.versionBorder ? styles.versionBorder : defaults.border,
    },
    header: {
        borderRadius: `${styles?.headerTopRounded || 0}px ${styles?.headerTopRounded || 0}px ${styles?.headerBottomRounded || 0}px ${styles?.headerBottomRounded || 0}px`,
        borderTop: styles.headerTopFill ? `${styles.headerTopFill}px solid ${styles.headerBackground}` : 0,
        borderBottom: styles.headerBottomFill ? `${styles.headerBottomFill}px solid ${styles.headerBackground}` : 0,
        paddingTop: styles.headerTopFill ? styles.headerItemDividerWidth - 1 : null,
        paddingBottom: styles.headerBottomFill ? styles.headerItemDividerWidth - 1 : null,
        marginLeft: styles?.headerPadding,
        marginRight: styles?.headerPadding,
        marginBottom: styles?.headerDistance,
        color: styles.headerTextColor || 'inherit',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        opacity: styles.headerOpacity || 0.9,
        fontSize: styles.headerFontSize || '1vw',
        '& .MuiGrid-item': {
            color: styles.headerTextColor ? `${styles.headerTextColor}!important` : 'inherit',
            padding: styles.padding,
            background: styles.headerBackground,
        },
        '& a.MuiGrid-item': {
            color: styles.headerButtonTextColor ? `${styles.headerButtonTextColor}!important` : 'inherit',
            padding: styles.padding,
            background: styles.headerBackground,
        },

    },
    headerTitle: {
        paddingRight: `${styles.padding * 5}px!important`,
        marginRight: `${styles.headerItemDividerWidth}px!important`,
    },
    headerRightItem: {
        marginLeft: styles.headerItemDividerWidth,
    },
    headerButton: {
        position: 'relative',
        paddingLeft: `${styles.padding * 1.5}px!important`,
        paddingRight: `${styles.padding * 1.5}px!important`,
        color: `${styles.headerButtonTextColor}!important`,
        background: `${styles.headerButtonBackground}!important`,
        marginRight: styles.headerItemDividerWidth,
        borderRadius: styles?.headerButtonBorderRadius,
        border: styles?.headerButtonBorder,
        ...(styles.headerButtonInnerBorder ? {
            '&::before': {
                content: '""',
                position: 'absolute',
                top: -1,
                left: -1,
                right: -1,
                bottom: -1,
                borderRadius: styles.headerButtonBorderRadius ? styles.headerButtonBorderRadius * 0.5 : 0,
                border: styles.headerButtonInnerBorder,
            },
        } : {}),
        /* '&::after': {
            content:'""',
            position:"absolute",
            top:0,
            left:0,
            right:0,
            bottom:0,
            borderRadius:10,
            border: `2px solid #fff`,
        },
        '&::before': {
            content:'""',
            position:"absolute",
            top:0,
            left:0,
            right:0,
            bottom:0,
            background: "#FFFFFF",
            padding:3,
            borderRadius:10,
            mask: `
              linear-gradient(#fff,#fff) top/calc(100% - 25px) 5px,
              linear-gradient(#fff,#fff) bottom/calc(100% - 25px) 5px,
              linear-gradient(#fff,#fff) left/5px calc(100% - 25px),
              linear-gradient(#fff,#fff) right/5px calc(100% - 25px),
              linear-gradient(#fff,#fff) content-box,
              linear-gradient(#fff,#fff);`,
            maskComposite: 'destination-out',
            //"-webkit-mask-composite": "destination-out",
            maskRepeat: 'no-repeat',
        },*/
        '&:hover': {
            opacity: 0.5,
            cursor: 'pointer',
        },
        '&:active': {
            opacity: 0.75,
        },
    },
    content: {
        paddingTop: styles.padding,
        paddingBottom: 1,
        height: `calc(100vh - ${styles.padding * 7}px - ${styles.headerBottomFill || 0}px - ${styles.headerTopFill || 0}px - ${styles.headerDistance || 0}px - ${styles.headerPadding || 0}px - ${styles.versionDistance || 0}px + ${styles.columnPadding ? (styles.columnPadding / 2) : 0}px)`,
    },
    surface: {
        overflow: 'hidden',
        border: styles.columnBorder || defaults.border,
        margin: styles.columnPadding || 0,
        marginTop: 0,
        borderRadius: styles.columnBorderRadius || 0,
        '& .inner': {
            overflow: 'hidden',
            width: '100%',
            height: '100%',
            border: styles.columnInnerBorder || null,
            borderRadius: styles.columnBorderRadius ? styles.columnBorderRadius * 0.9 : 0,
            background: styles.columnBackground || 'transparent',
        },
        '& .scroll': {
            padding: styles?.columnInnerPadding,
            overflow: 'hidden',
            'overflow-y': 'auto',
            width: '100%',
            height: '100%',
        },
    },
    divider: {
        borderTop: defaults.border,
    },
    section: {
        paddingTop: styles.padding / 2,
        paddingBottom: styles.padding / 2,
    },
    sectionNoPadding: {
        marginTop: 0,
        marginBottom: 0,
    },
    button: {
        boxShadow: `0px 0px 0px ${styles.actionButtonBorderSize}px ${styles.actionButtonBorderColor}`,
        borderRadius: styles.actionButtonBorderRadius,
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
        display: 'flex',
        flex: 1,
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: '1vw',
        margin: styles.margin,
        marginBottom: styles.margin * 2,
        padding: styles.actionButtonBorderDistance || styles.actionButtonBorderSize,
        '& span': {
            width: '100%',
            display: 'block',
            padding: styles.padding,
            background: styles.actionButtonBackground,
            borderRadius: styles.actionButtonBorderRadius * 0.8,
            color: `${styles.actionButtonTextColor}!important`,
            fontSize: styles.actionButtonFontSize ? `${styles.actionButtonFontSize}!important` : null,
        },
        '& span:hover': {
            opacity: 0.5,
            cursor: 'pointer',
        },
        '& span:active': {
            opacity: 0.75,
        },
    },
    buttonAlignLeft: {
        marginLeft: `${styles.margin}px!important`,
    },
    buttonAlignRight: {
        marginRight: `${styles.margin}px!important`,
    },
    buttonCompact: {
        display: 'block',
        margin: `${styles.margin}px auto`,
        width: '20vw',
        textAlign: 'center',
    },
    login: {
        textAlign: 'center',
        '& h1': {
            textAlign: 'center',
            padding: 0,
            margin: styles.margin,
            marginBottom: styles.margin * 3,
            fontSize: '1.5vw',
            opacity: 0.9,
            fontWeight: 'normal',
            textTransform: 'uppercase',
        },
        '& img': {
            width: '15vw',
            paddingBottom: 20,
            opacity: 0.9,
        },
    },
    logo: {
        display: 'block',
        width: '20vw',
        paddingBottom: 20,
        opacity: 0.9,
    },
    widget_markdown: {
        padding: styles.padding * 2,
        fontSize: '1vw',
        '& h1, h2, h3, h4, h5': {
            color: `${styles.textColor}!important`,
            opacity: 0.6,
            padding: 0,
            margin: 0,
            marginBottom: styles.margin * 3,
            textAlign: 'left',
            textTransform: 'uppercase',
            fontWeight: 'normal',
            borderBottom: defaults.border,
            paddingTop: styles.padding,
            paddingBottom: 2,
            borderWidth: '0.25px!important',
        },
        ...['h5', 'h4', 'h3', 'h2', 'h1'].reduce((out, h, index) => ({
            ...out, [`& ${h}`]: {
                fontSize: `${0.5 * (2 + index)}vw!important`,
            },
        }), {}),
        '& a': {
            color: `${styles.actionButtonTextColor}!important`,
            borderRadius: styles.actionButtonBorderRadius,
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            background: styles.actionButtonBackground,
            paddingLeft: styles.padding / 3,
            paddingRight: styles.padding / 3,
            cursor: 'pointer',
        },
        '& a:hover': {
            opacity: 0.5,
        },
        '& a.button': {
            background: "inherit!important",
        },
        '& hr': {
            marginTop: defaults.margin * 2,
            marginBottom: defaults.margin * 2,
            border: 0,
            borderTop: defaults.border,
            opacity: 0.5,
        },
        '& p': {
            marginLeft: 0,
            fontSize: '1vw',
        },
        '& li': {
            marginBottom: styles.margin,
        },
        '& ol, ul': {
            marginBottom: styles.margin * 2,
        },
        '& code': {
            fontFamily: 'monospace',
            borderRadius: styles.invertedBorderRadius,
            color: styles.invertedTextColor,
            background: styles.invertedBackgroundColor,
            boxShadow: `0px 0px 0px 3px ${styles.invertedBackgroundColor}`,
            border: `1px solid ${styles.invertedTextColor}`,
        },
        '& pre code': {
            display: 'block',
            padding: styles.padding,
        },
        '& p code': {
            padding: 2,
            paddingLeft: styles.padding,
            paddingRight: styles.padding,
        },
        '& table, td, tr, th': {
            background: styles.invertedBackgroundColor,
            color: styles.invertedTextColor,
            margin: 0,
            padding: 0,
            border: 0,
            outline: 0,
            borderSpacing: 2,
        },
        '& table': {
            borderRadius: styles.invertedBorderRadius,
            border: `2px solid ${styles.invertedBackgroundColor}`,
            marginBottom: styles.margin * 2,
        },
        '& th': {
            textTransform: 'uppercase',
        },
        '& td, tr, th': {
            padding: styles.padding,
            borderRadius: styles.invertedBorderRadius,
            border: `1px solid ${styles.invertedTextColor}`,
        },
        '& img': {
            maxWidth: '100%',
            borderRadius: styles.invertedBorderRadius,
            border: `1px solid ${styles.invertedBackgroundColor}`,
            overflow: 'hidden',
        },
    },
    list: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        '& li': {
            position: 'relative',
            color: styles?.listItemTextColor ? `${styles.listItemTextColor}!important` : null,
            fontSize: styles?.listItemFontSize,
            background: styles?.listItemBackground,
            padding: styles.padding,
            margin: styles?.listItemMargin || styles.margin,
            marginBottom: styles?.listItemDistance,
            border: styles.listItemBorder || defaults.border,
            borderRadius: styles.listItemBorderRadius || 0,
            '&::after': {
                clear: 'both',
            },
            '& label': {
                display: 'block',
                fontSize: '1.5em',
                marginBottom: styles.margin * 1.5,
            },
            '& p': {
                fontSize: '1em',
                padding: 0,
                margin: 0,
            },
            '& ins': {
                float: 'left',
                width: styles.listItemImageSize,
                height: styles.listItemImageSize,
                border: styles?.listItemImageBorder,
                borderRadius: styles.listItemBorderRadius || 0,
                marginRight: styles.margin * 1.5,
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                padding: styles.padding,
                '& img': {
                    width: '100%',
                },
            },
            '& div': {
                '& span': {
                    display: 'inline-block',
                    opacity: 0.5,
                    marginRight: styles.margin,
                    textTransform: 'capitalize',
                },
            },
            '& a': {
                color: `${styles.listItemHighlightTextColor}!important`,
                background: styles?.listItemHighlightBackground,
                borderRadius: styles?.listItemHighlightBorderRadius,
                border: styles.listItemHighlightBorder,
                position: 'absolute',
                bottom: styles.padding,
                right: styles.padding,
                textTransform: 'uppercase',
                paddingLeft: styles.padding,
                paddingRight: styles.padding,
                width: '40%',
                textAlign: 'center',
            },
        },
        '& li:hover, li:active, .selected': {
            border: styles?.listItemSelectedBorder,
            cursor: 'pointer',
        },
        '& li:active, .selected': {
            background: styles?.listItemSelectedBackground,
        },
    },

}));

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
const play = (pool, action) => {
    const { sounds } = pool || {};
    if (sounds && sounds[action] && sounds[action].readyState > 0) {
        sounds[action].play().catch(err => {
            // nothing to do
        });
    }
};

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
const defaultActionEvents = (config) => ({
    consumables: {
        onMouseEnter: () => {
            play(config, Sounds.Hover);
        },
    },
    onDefaultLeave: () => {
        play(config, Sounds.Exit);
    },
    onDefaultEnter: () => {
        play(config, Sounds.Enter);
    },
});


// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
const handleAction = (config) => (action) => () => {
    config.defaultActionEvents.onDefaultLeave();
    if (action.onClick) {
        return action.onClick();
    }
    if (action.open) {
        return window.open(action.open);
    }
    if (action.callback) {
        const callback = action.callback.constructor === String ? ({ [action.callback]: action.value || action }) : action.callback;
        if (config.onCallback && config.onCallback.constructor === Function) {
            config.onCallback(callback);
        }
    }
};

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
const Centered = ({ enabled, children }) => {
    if (!enabled) {
        return children;
    }

    return (
        <Grid
            container
            alignItems="center"
            justify="center"
            style={{ width: '100%', height: '100%' }}
        >
            <Grid item xs={12}>
                {children}
            </Grid>
        </Grid>
    );
};

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
const Item = ({ config, item }) => {
    const { useStyles } = config;
    const classes = useStyles();

    if (item.title) {
        return (
            <h2>/{item.title}</h2>
        );
    }

    if (item.subtitle) {
        return (
            <h3>{item.subtitle}</h3>
        );
    }

    if (item.text) {
        return (
            <p>{item.text}</p>
        );
    }

    if (item.content) {
        return item.content(classes);
    }

    if (item.action) {
        item.widget = Widgets.Action;
        const {label, action, compact} = item;
        item.label = label || action;
        item.compact = compact !== undefined ? compact : false;
    }

    return Widget(item, config, classes);
};

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
const Page = ({ config, page, id }) => {
    const { useStyles, styles } = config;
    const columnPadding = styles.columnPadding || 0;
    const classes = useStyles();

    return (
        <Grid
            container
            className={classes.content}
            wrap="nowrap"
            direction="row"
        >
            {page.columns.map((column, columnIndex) =>
                <Grid
                    item
                    key={columnIndex}
                    xs={column.size || null}
                    className={classes.surface}
                    style={{
                        marginLeft: columnIndex > 0 ? (columnPadding || 10) : (columnPadding || 0),
                        marginRight: columnIndex === page.columns.length - 1 ? columnPadding : 0,
                    }}
                >
                    <div className="inner">
                        <div className="scroll">
                            <Centered enabled={column.centered}>
                                {[...(column.sections || [])].map((section, sectionIndex) =>
                                    <Fragment key={sectionIndex}>
                                        {sectionIndex > 0 ? <div className={classes.divider} /> : null}
                                        <div className={[classes.section, column.noSectionPadding ? classes.sectionNoPadding : ''].join(' ')}>
                                            {section.map((item, itemIndex) =>
                                                <Item
                                                    key={itemIndex}
                                                    config={config}
                                                    item={{ id: [id, sectionIndex, itemIndex].join('.'), ...item }}
                                                />
                                            )}
                                        </div>
                                    </Fragment>
                                )}
                            </Centered>
                        </div>
                    </div>
                </Grid>
            )}
        </Grid>
    );
};

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
const AppHeader = ({ config, initialized, onChangeInitialize }) => {
    const { useStyles, overwrites, name, version, login, navigation } = config;
    const adjustedDate = () => {
        const n = new Date();
        n.setFullYear(n.getFullYear() + (overwrites.adjustedYears || 930));
        return overwrites.useLocalTime ? n : addMinutes(n, n.getTimezoneOffset());
    };

    const [current, setCurrent] = useState(adjustedDate());
    const classes = useStyles();

    useEffect(() => {
        const timerID = setInterval(() => setCurrent(adjustedDate()), 1000);
        return function cleanup() {
            clearInterval(timerID);
        };
    });

    return (
        <Fragment>
            <Grid item className={classes.version}>
                <Grid
                    container>
                    <Grid item xs className={classes.versionLine} />
                    <Grid item>
                        <span>
                            {`OTRM VER ${PackageVersion}/${overwrites.acID} ${version}`}
                        </span>
                    </Grid>
                    <Grid item xs className={classes.versionLine} />
                </Grid>
            </Grid>
            <Grid item className={classes.header}>
                <Grid
                    container
                    wrap="nowrap"
                >
                    <Grid item className={classes.headerTitle}>
                        {name}
                    </Grid>
                    {login.enabled && !initialized ? null : (
                        [
                            ...(navigation.rootEnabled ? [{
                                name: navigation.rootLabel,
                                page: 'root',
                            }] : []),
                            ...(navigation.items || []),
                            ...(navigation.logoutEnabled ? [{
                                name: navigation.logoutLabel,
                                onClick: () => {
                                    onChangeInitialize(false);
                                    config.defaultActionEvents.onDefaultEnter();
                                },
                            }] : []),
                        ].map((nav, navIndex) =>
                            <Grid
                                item
                                key={navIndex}
                                className={classes.headerButton}
                                onClick={config.handleAction(nav)}
                                component="a"
                                {...config.defaultActionEvents.consumables}
                                {...(nav.page ? makeLink(nav) : {})}
                            >
                                {nav.name}
                            </Grid>
                        )
                    )}
                    <Grid item xs />
                    {current && navigation.showDate === false ? null : (
                        <Grid item className={classes.headerRightItem}>
                            {format(current, 'yyyy/MM/dd', { timeZone: 'UTC' })}
                        </Grid>
                    )}
                    {current && navigation.showTime === false ? null : (
                        <Grid item className={classes.headerRightItem}>
                            {format(current, 'HH:mm:ss', { timeZone: 'UTC' })}{overwrites.adjustedTimezone}
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Fragment>
    );
};
// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\
const AppContent = ({ config, initialized, onChangeInitialize }) => {
    const { useStyles, pages, tagline, login, root, logo } = config;
    const classes = useStyles();
    const introLogo = login.logo !== true && login.logo ? login.logo : logo;

    if (login.enabled && !initialized) {
        return (
            <Centered enabled>
                <Grid item className={classes.login}>
                    {login.logo ? <img src={introLogo} alt={tagline} align="center" /> : null}
                    {login.text ? <h1>{root.text}</h1> : null}
                    {[{
                        action: login.action,
                        compact: true,
                        onClick: () => {
                            onChangeInitialize(true);
                            play(config, Sounds.Startup);
                        },
                    }, ...(login.actions || [])].map((item, itemIndex) => (
                        <div key={itemIndex}>
                            <Item 
                                config={config} 
                                item={{ ...item, compact: true }} 
                            />
                        </div>
                    ))}
                </Grid>
            </Centered>
        );
    }

    return (
        <Grid xs item>
            <Switch>
                {Object.keys(pages).map((name, pageIndex) => {
                    const page = pages[name];
                    const isRoot = name === 'root' || page.root;
                    const path = `/${!isRoot ? (page.path || name) : ''}`;
                    return (
                        <Route key={pageIndex} exact={isRoot} path={path}>
                            <Page
                                config={config}
                                name={name}
                                page={page}
                                id={pageIndex}
                            />
                        </Route>
                    );
                })}
                <Route match="*">
                    <Centered enabled>
                        <h4>Resource not available</h4>
                    </Centered>
                </Route>
            </Switch>
        </Grid>
    );
};

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
const App = ({ config }) => {
    const [initialized, setInitialized] = useState(false);
    const classes = config.useStyles();

    return (
        <Grid
            container
            className={classes.root}
            direction="column"
            wrap="nowrap"
        >
            <AppHeader
                config={config}
                initialized={initialized}
                onChangeInitialize={(value) => setInitialized(value)}
            />
            <AppContent
                config={config}
                initialized={initialized}
                onChangeInitialize={(value) => setInitialized(value)}
            />
        </Grid>
    );
};


// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
const OTRM = memo(({ config = {}, callback = false }) => {
    const [current, setCurrent] = useState(false);

    const makeConfig = () => {
        const c = merge((config || {}), DefaultConfig);
        c.styles = { ...c.styles, ...(c.theme?.styles || {}), ...(config?.styles || {}) };
        c.sounds = Object.keys(c.sounds).reduce((o, m) => ({ ...o, [m]: new Audio(c.sounds[m]) }), {});
        c.defaults = bakeDefaults(c);
        c.useStyles = bakeStyles(c);
        c.theme = bakeTheme(c);
        c.onCallback = callback;
        c.defaultActionEvents = defaultActionEvents(c);
        c.handleAction = handleAction(c);
        setCurrent(c);
        InitializeWidgets(c);
    };

    useEffect(() => {
        makeConfig();
    }, [config]);

    if (!current) {
        return null; // @todo loading screen
    }

    return (
        <ThemeProvider theme={current.theme}>
            <CssBaseline />
            <BrowserRouter basename={process.env.PUBLIC_URL === "." ? null : process.env.PUBLIC_URL}>
                <StoreProvider initial={{}}>
                    <App
                        config={current}
                    />
                </StoreProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
});

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
export default OTRM;
