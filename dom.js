/**
 * Copyright Andrei Idriceanu
 */

const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const {window} = new JSDOM(`<!DOCTYPE html>`);
const {document} = window;

var dgDomScriptFunctions = {};

var dgDomScriptMaxIndex = 0;

function renderString(html)
{
    let template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}

function renderArray(html)
{
    if (typeof html[0] === 'string' && html[0] !== '') {
        let tagName = html.shift();
        var parent = document.createElement(tagName);
    }
    return renderElement(parent, html);
}

function renderScriptElementChildren(parent, child) {
    if (child instanceof Function) {
        dgDomScriptFunctions[dgDomScriptMaxIndex] = child;
        child = '(dgDomScriptFunctions[' + dgDomScriptMaxIndex + '])();';
        dgDomScriptMaxIndex++;
    }
    try {
        parent.innerHTML = parent.innerHTML || '';
        parent.innerHTML += child;
    } catch (e) {
        parent.text = parent.text || ''
        parent.text += child;
    }
}

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
    if (html instanceof  Function) {
        dgDomScriptFunctions[dgDomScriptMaxIndex] = html;
        html = '(dgDomScriptFunctions[' + dgDomScriptMaxIndex + '])();';
        dgDomScriptMaxIndex++;
    } else if (typeof html[i] != 'string') {
        for (var j in html[i]) {
            if (/^on.+/.test(j) && (html[i][j] instanceof Function)) {
                txt[j] = html[i][j];
            } else {
                $(txt).attr(j, html[i][j] + '');
            }
        }
    }
    try {
        txt.innerHTML = txt.innerHTML || '';
        txt.innerHTML += html[i];
    } catch (e) {
        txt.text = txt.text || ''
        txt.text += html[i];
    }
}

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

/**
 * @param parent
 * @param children
 * @returns {*}
 */
function renderElementChildren(parent, children)
{
    children = render(children);
    for (var j = 0; j < children.length; j++) {
        parent.appendChild(children[j]);
    }
    return parent;
}

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
}

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