// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
import {Link} from 'react-router-dom';

// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
export const makeLink = item => {
    const {page} = item;
    const to = page === 'root' || page === '/' ? '/' : (page ? `/${item.page}` : false);
    if (!to) {
        return {
            component: "a",
            href: "#",
        };
    }
    return {
        to,
        component: Link,
    };
};


// \\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
// https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
export const merge = (objFrom, objTo) => Object.keys(objFrom)
    .reduce(
        (merged, key) => {
            merged[key] = objFrom[key] instanceof Object && !Array.isArray(objFrom[key]) ?
                merge(objFrom[key], merged[key] ?? {}) :
                objFrom[key];
            return merged;
        }, {...objTo}
    );
