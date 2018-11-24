/**
 * Copyright Andrei Idriceanu
 */

if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
          // closest thing possible to the ECMAScript 5 internal IsCallable function
          throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }
        
        var aArgs = Array.prototype.slice.call(arguments, 1), 
            fToBind = this, 
            fNOP = function () {},
            fBound = function () {
              return fToBind.apply(this instanceof fNOP
                                 ? this
                                 : oThis || window,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
            };
            
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

Function.prototype.dgBind = function (){
    var arg = [this];
    for (var i = 0; i < arguments.length; i++) {
    arg.push(arguments[i]);
    }
    return this.bind.apply(this, arg);
};


String.prototype.ucfirst = function () {
    return this.charAt(0).toUpperCase() + this.substr(1);
};

String.prototype.camelcase = function() {
    var result = this.split('-');
    for (var i =1; i < result.length; i++) {
        result[i] = result[i].ucfirst();
    }
    return result.join('');
};

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

function renderScriptElement(parent, html)
{
    if (html[i] instanceof  Function) {
        dgf[dgi] = html[i];
        html[i] = '(dgf[' + dgi + '])();';
        dgi++;
    } else if (typeof html[i] != 'string') {
        for (var j in html[i]) {
            if (/^on.+/.test(j) && (html[i][j] instanceof Function)) {
                txt[j] = html[i][j];
            } else {
                $(txt).attr(j, html[i][j] + '');
            }
        }
        continue;
    }
    try {
        txt.innerHTML = txt.innerHTML || '';
        txt.innerHTML += html[i];
    } catch (e) {
        txt.text = txt.text || ''
        txt.text += html[i];
    }
}

function renderElementStyleAttribute(parent, styles)
{
    if (typeof styles === 'string') {
        parent.style = styles;
    } else if (styles instanceof Function) {
        parent = renderElementStyleAttribute(parent, styles());
    } else {
        for (let style in styles) {
            if (styles.hasOwnProperty(style)) {
                parent.style = parent.style + style + ": " + styles[style] + ";";
            }
        }
    }
    return parent;
}

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
        if (/^on.+/.test(attr) && (attributes[attr] instanceof Function) {
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
            parent = renderElementChildren(paren, child);
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

exports.renderString = dgv2String;