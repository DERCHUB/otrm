// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
import React, {Fragment, useEffect, useState} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {Widgets} from './const';
import YouTube from 'react-youtube';
import Markdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import highlight from 'remark-highlight.js';
import hbs from 'handlebars';
import {useStore} from './store';
import {makeLink} from './lib';
import {format} from "date-fns";
import {Link} from 'react-router-dom';

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
const WidgetList = (item, config, classes) => {
    const {items, onSelect, id} = item;
    const [state, dispatch] = useStore();

    const handleSelect = (index) => () => {
        if (onSelect) {
            config.defaultActionEvents.onDefaultLeave();
            dispatch({[onSelect]: items[index], [id]: index});
        }
    };

    return (
        <ul className={classes.list}>
            {[...(items || [])].map(({image, label, sublabel, key, value, highlight}, index) => (
                <li
                    key={index}
                    onClick={handleSelect(index)}
                    className={state[id] === index ? 'selected' : ''}
                    {...config.defaultActionEvents.consumables}
                >
                    {image ? <ins><img src={image} alt="" /></ins> : null}
                    {label ? <label>{label}</label> : null}
                    {sublabel ? <p>{sublabel}</p> : null}
                    {key ? <div><span>{key}:</span>{value}</div> : null}
                    {highlight ? <a>{highlight}</a> : null}
                    <div style={{clear: 'both'}} />
                </li>
            ))}
        </ul>
    );
};


// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
const WidgetAction = ({item, config}) => {
    const classes = config.useStyles();
    const {label, compact, align} = item;
    const link = makeLink(item);
    return (
        <link.component
            className={[
                "button",
                classes.button, 
                compact === undefined || compact === true ? classes.buttonCompact : "",
                align === "left" ? classes.buttonAlignLeft : "",
                align === "right" ? classes.buttonAlignRight : "",
            ].join(' ')}
            onClick={config.handleAction(item)}
            {...config.defaultActionEvents.consumables}
            to={link.to}
        >
            <span>
                {label}
            </span>
        </link.component>
    );
};

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
const WidgetImage = (item /* , config, classes*/) => {
    if (item.image) {
        return (
            <div className="Image-container-shell">
                <img src={item.image} alt="" />
            </div>
        );
    }

    return null;
};

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
const WidgetVideo = (item /* , config, classes*/) => {
    const makeVideo = (video) =>
        <div className="Video-container-shell">
            <YouTube
                key={video}
                videoId={video}
                width="100%"
                containerClassName={'Video-container'}
                opts={{
                    ...(item.autoplay ? {
                        playerVars: {
                            autoplay: 1,
                        },
                    } : {}),
                    ...(item.options || {}),
                }}
            />
        </div>;

    if (!item.videos) {
        return makeVideo(item.video);
    }

    return null;
};

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
const WidgetMarkup = ({item, config, classes}) => {
    const [markdown, setMarkdown] = useState('');
    const [output, setOutput] = useState('');
    const [state] = useStore();
    const {onData, source, data} = item;
    const time = new Date();

    useEffect(() => {
        fetch(source).then((res) => res.text()).then((text) => setMarkdown(text));
    }, [source]);

    useEffect(() => {
        const template = hbs.compile(markdown);
        setOutput(template({
            ...data,
            ...(state[onData] || {}),
            ...{
                time_hour: format(time, "H"),
                time_minute: format(time, "m"),
                time_second: format(time, "s"),
            }
        }));
    }, [
        markdown, data, state[onData],
    ]);

    return (
        <Markdown
            className={classes.widget_markdown}
            remarkPlugins={[gfm, highlight]}
            rehypePlugins={[rehypeRaw]}
            components={{
                action: (props) => {
                    try {
                        const m = JSON.parse(props.context);
                        return (
                            <WidgetAction item={m} config={config} />
                        );
                    } catch (_) {
                        // nothing to do here
                    }
                    return;
                },
            }}
        >
            {output}
        </Markdown>
    );
};

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
const Widget = (item, config, classes) => {
    const {widget} = item;

    if (widget === Widgets.Action) {
        return (
            <WidgetAction item={item} config={config} />
        )
    }

    if (widget === Widgets.Logo) {
        return (
            <Fragment>
                {item.withLogo !== false ? (
                    <img src={config.logo} className={classes.logo} alt={`${config.tagline}`} align="center" />
                ) : null}
                {item.withText !== false ? (
                    <h4>{item.text || config.tagline}</h4>
                ) : null}
            </Fragment>
        );
    }

    if (widget === Widgets.Video) {
        return WidgetVideo(item, config, classes);
    }

    if (widget === Widgets.Markdown) {
        return <WidgetMarkup item={item} config={config} classes={classes} />;
    }

    if (widget === Widgets.Image) {
        return WidgetImage(item, config, classes);
    }

    if (widget === Widgets.List) {
        return WidgetList(item, config, classes);
    }

    return null;
};

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
export const InitializeWidgets = () => {
    hbs.registerPartial('action', (context) => {
        return renderToStaticMarkup(
            <action context={JSON.stringify(context)}/>
        );
    });
    //https://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional
    hbs.registerHelper({
        eq: (v1, v2) => v1 === v2,
        ne: (v1, v2) => v1 !== v2,
        lt: (v1, v2) => v1 < v2,
        gt: (v1, v2) => v1 > v2,
        lte: (v1, v2) => v1 <= v2,
        gte: (v1, v2) => v1 >= v2,
        and() {
            return Array.prototype.every.call(arguments, Boolean);
        },
        or() {
            return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
        }
    });
};

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
export default Widget;
