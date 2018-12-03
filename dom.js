/**
 * Copyright Andrei Idriceanu
 */

const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const {window} = new JSDOM(`<!DOCTYPE html>`);
const {document} = window;

let dgDomScriptFunctions = {"length": 0};

/**
 * Reset Global Variables: used for testing
 */
function resetGlobals() {
    dgDomScriptFunctions = {"length": 0};
}

exports.resetGlobals = resetGlobals;

/**
 * Returns Global Variables: used for testing
 * @returns {{dgDomScriptFunctions: {length: number}}}
 */
function getGlogals() {
    return {
        dgDomScriptFunctions: dgDomScriptFunctions
    };
}

exports.getGlogals = getGlogals;

/**
 * Render html provided as string
 * @param html
 * @returns {NodeListOf<Node & ChildNode>}
 */
function renderString(html)
{
    let template = document.createElement('template');
    template.innerHTML = html;
    return Array.prototype.slice.call(template.content.childNodes);
}

exports.renderString = renderString;

/**
 * Render html provided as Array
 * @param html
 * @returns {*}
 */
function renderArray(html)
{
    if (typeof html[0] === 'string' && html[0] !== '') {
        let tagName = html.shift();
        let parent = document.createElement(tagName);

        return [renderElement(parent, html)];
    } else {
        var elements = [];
        for (let element of html) {
            elements = elements.concat(render(element));
        }
        return elements;
    }
}

exports.renderArray = renderArray;

/**
 * Render Children of a script tag
 * @param parent
 * @param child
 */
function renderScriptElementChildren(parent, child) {
    if (child instanceof Function) {
        dgDomScriptFunctions[dgDomScriptFunctions.length] = child;
        child = '(dgDomScriptFunctions[' + dgDomScriptFunctions.length + '])();';
        dgDomScriptFunctions.length += 1;
    }
    try {
        parent.innerHTML = parent.innerHTML || '';
        parent.innerHTML += child;
    } catch (e) {
        parent.text = parent.text || '';
        parent.text += child;
    }

    return parent;
}

exports.renderScriptElementChildren = renderScriptElementChildren;

/**
 * Render script element
 * @param parent
 * @param html
 */
function renderScriptElement(parent, html)
{
    for (let child of html) {
        if (typeof child === 'object' && !(child instanceof Array)) {
            parent = renderElementAttributes(parent, child);
        } else {
            parent = renderScriptElementChildren(parent, child);
        }
    }
    return parent;
}

exports.renderScriptElement = renderScriptElement;

/**
 * Render the style attribute
 * @param parent
 * @param styles
 * @returns {*}
 */
function renderElementStyleAttribute(parent, styles)
{
    if (typeof styles === 'string') {
        parent.style = styles;
    } else if (styles instanceof Function) {
        parent = renderElementStyleAttribute(parent, styles());
    } else if (styles instanceof Object && !(styles instanceof Array)) {
        let stylesText = "";
        for (let style in styles) {
            if (styles.hasOwnProperty(style)) {
                stylesText += style + ": " + styles[style] + ";";
            }
        }
        parent.style = stylesText;
    }
    return parent;
}

exports.renderElementStyleAttribute = renderElementStyleAttribute;

/**
 * Render provided attributes of a element
 * @param parent
 * @param attributes
 * @returns {*}
 */
function renderElementAttributes(parent, attributes)
{
    for (let attr in attributes) {
        if (!attributes.hasOwnProperty(attr)) {
            continue;
        }
        if (/^on.+/.test(attr) && (attributes[attr] instanceof Function)) {
            parent[attr] = attributes[attr];
        } else if (attr === "style") {
            parent = renderElementStyleAttribute(parent, attributes[attr]);
        } else if (attr === "class") {
            try {
                parent.setAttribute(attr, attributes[attr] + "");
                parent.className = attributes[attr] + "";
            } catch (e) {
                parent.className = attributes[attr] + "";
            }
        } else {
            parent.setAttribute(attr, attributes[attr] + "");
        }
    }
    return parent;
}

exports.renderElementAttributes = renderElementAttributes;

/**
 * @param parent
 * @param children
 * @returns {*}
 */
function renderElementChildren(parent, children)
{
    if (children) {
        for (let child of render(children)) {
            parent.appendChild(child);
        }
    }

    return parent;
}

exports.renderElementChildren = renderElementChildren;

/**
 * @param parent
 * @param html
 * @returns {*}
 */
function renderElement(parent, html)
{
    if (parent && parent.tagName === "SCRIPT") {
        return renderScriptElement(parent, html);
    }
    for (let child of html) {
        if (typeof child === 'object' && !(child instanceof Array)) {
            parent = renderElementAttributes(parent, child);
        } else {
            parent = renderElementChildren(parent, child);
        }
    }
    return parent;
}

exports.renderElement = renderElement;

function render(html)
{
    if (html instanceof Function) {
        return render(html());
    }

    if (html instanceof String || typeof html === 'string' || typeof html === 'number') {
        return renderString(html);
    }

    if (html instanceof Array) {
        return renderArray(html);
    }

    return [];
}


exports.render = render;