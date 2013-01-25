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

function ucfirst (str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
}

function camelcase (string) {
    var result = string.split('-');
    for (var i =1; i < result.length; i++) {
        result[i] = ucfirst(result[i]);
    }
    return result.join('');
}

dgf = {};

dgi = 0;

function dgv2 (html) {
    if (html instanceof Function)
    return dgv2(html());
    
    if (html instanceof String || typeof html == 'string' || typeof html == 'number') {
        var div = document.createElement('div');
        div.innerHTML = html;
        var elems = [];
        while (div.childNodes.length) {
            var node = div.childNodes[0];
            div.removeChild(node);
            elems.push(node);
        }
        return elems;
    }
    
    if (html instanceof Array) {
        var txt = null;
        if (typeof html[0] === 'string' && html[0] != '') {
            var tag = html[0];
            var txt = document.createElement(html[0]);
            var children = [];
    
            for (var i = 1; i < html.length; i++) {
                if (tag == 'script') {
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
                    continue;
                }
                
                if (html[i] instanceof  Function) {
                    html[i] = html[i]();
                }
                
                if (html[i] instanceof String || typeof html[i] == 'string' || html[i] instanceof Array || typeof html[i] == 'number') {
                    children = children.concat(dgv2(html[i]));
                } else {
                    for (var j in html[i]) {
                        if (/^on.+/.test(j) && (html[i][j] instanceof Function)) {
                            txt[j] = html[i][j];
                        } else {
                                $(txt).attr(j, html[i][j] + '');                            
                        }
//                        } else if (j == 'style'){
//                            var styles = html[i][j].split(';');
//                            for (var k = 0; k < styles.length; k++) {
//                                if (styles[k] == '')
//                                    continue;
//                                var style = styles[k].split(':');
//                               if (style.length != 2)
//                                    continue;
//                                style[0] = camelcase(style[0].replace(/^\s+|\s+$/g,""));
//                                style[1] = style[1].replace(/^\s+|\s+$/g,"");
//                                txt.style[style[0]] = style[1];
//                            }
//                        } else if (j == 'class') {
//                            try {
//                                txt.setAttribute(j, html[i][j] + '');
//                                txt.className = html[i][j];
//                            } catch (e) {
//                                txt.className = html[i][j];
//                            }
//                           
//                        } else {
//                            txt.setAttribute(j, html[i][j] + '');
//                        }
                    }
                }
            }
            if (tag == 'table') {
                var aux = document.createElement('tbody');
                for (var j = 0; j < children.length; j++) {
                    aux.appendChild(children[j]);
                }
                txt.appendChild(aux);
            } else {
                for (var j = 0; j < children.length; j++) {
                    txt.appendChild(children[j]);
                }
            }
            txt = [txt];
        } else {
            txt = [];
            for (var i = 0; i < html.length; i++) {
                txt = txt.concat(dgv2(html[i]));
            }
        }
        return txt;
    }
    return [];
}
