// Depends on prototype.js
// Applies a sequence of numbers between 0 and 1 to a number of subjects
var Animator = Class.create();
Animator.prototype = {
    // construct - see setOptions for parameters
    initialize: function (options) {
        this.setOptions(options);
        this.timerDelegate = this.onTimerEvent.bind(this);
        this.subjects = [];
        this.target = 0;
        this.state = 0;
    },
    // apply defaults
    setOptions: function (options) {
        this.options = Object.extend(
            {
                interval: 40, // time between animation frames
                duration: 400, // length of animation
                onComplete: function () {},
                onStep: function () {},
                transition: Animator.tx.easeInOut,
            },
            options || {}
        );
    },
    // animate from the current state to provided value
    seekTo: function (to) {
        this.seekFromTo(this.state, to);
    },
    // animate from the current state to provided value
    seekFromTo: function (from, to) {
        this.target = Math.max(0, Math.min(1, to));
        this.state = Math.max(0, Math.min(1, from));
        if (!this.intervalId) {
            this.intervalId = window.setInterval(this.timerDelegate, this.options.interval);
        }
    },
    // animate from the current state to provided value
    jumpTo: function (to) {
        this.target = this.state = Math.max(0, Math.min(1, to));
        this.onTimerEvent();
    },
    // seek to the opposite of the current target
    toggle: function () {
        this.seekTo(1 - this.target);
    },
    // add a function or an object with a method setState(state) that will be called with a number
    // between 0 and 1 on each frame of the animation
    addSubject: function (subject) {
        this.subjects[this.subjects.length] = subject;
        return this;
    },
    // remove an object that was added with addSubject
    removeSubject: function (subject) {
        this.subjects = this.subjects.reject(function (item) {
            return item == subject;
        });
    },
    // remove all subjects
    clearSubjects: function () {
        this.subjects = [];
    },
    // forward the current state to the animation subjects
    propagate: function () {
        var value = this.options.transition(this.state);
        for (var i = 0; i < this.subjects.length; i++) {
            if (this.subjects[i].setState) {
                this.subjects[i].setState(value);
            } else {
                this.subjects[i](value);
            }
        }
    },
    // called once per frame to update the current state
    onTimerEvent: function () {
        var movement = (this.options.interval / this.options.duration) * (this.state < this.target ? 1 : -1);
        if (Math.abs(movement) >= Math.abs(this.state - this.target)) {
            this.state = this.target;
        } else {
            this.state += movement;
        }
        this.propagate();
        this.options.onStep.call(this);
        if (this.target == this.state) {
            window.clearInterval(this.intervalId);
            this.intervalId = null;
            this.options.onComplete.call(this);
        }
    },
    // shortcuts
    play: function () {
        this.seekFromTo(0, 1);
    },
    reverse: function () {
        this.seekFromTo(1, 0);
    },
};
Animator.makeArray = function (o) {
    if (o != null && !o.length && !o.toArray) {
        return [o];
    }
    return $A(o);
};
// syntactic sugar for creating CSSStyleSubjects
Animator.apply = function (el, style, options) {
    if (style instanceof Array) {
        return new Animator(options).addSubject(new CSSStyleSubject(el, style[0], style[1]));
    }
    return new Animator(options).addSubject(new CSSStyleSubject(el, style));
};
// make a transition function that gradually accelerates. pass a=1 for smooth
// gravitational acceleration, higher values for an exaggerated effect
Animator.makeEaseIn = function (a) {
    return function (state) {
        return Math.pow(state, a * 2);
    };
};
// as makeEaseIn but for deceleration
Animator.makeEaseOut = function (a) {
    return function (state) {
        return 1 - Math.pow(1 - state, a * 2);
    };
};
Animator.tx = {
    easeInOut: function (pos) {
        return -Math.cos(pos * Math.PI) / 2 + 0.5;
    },
    linear: function (x) {
        return x;
    },
    easeIn: Animator.makeEaseIn(1.5),
    easeOut: Animator.makeEaseOut(1.5),
};

// animates a pixel-based style property between two integer values
var NumericalStyleSubject = Class.create();
NumericalStyleSubject.prototype = {
    // animate el.style[property] between from and to
    initialize: function (els, property, from, to, units) {
        this.els = Animator.makeArray(els);
        if (property == 'opacity' && window.ActiveXObject) {
            this.property = 'filter';
        } else {
            this.property = property.camelize();
        }
        this.from = parseFloat(from);
        this.to = parseFloat(to);
        this.units = units || 'px';
    },
    setState: function (state) {
        var style = this.getStyle(state);
        var visibility = this.property == 'opacity' && state == 0 ? 'hidden' : '';
        for (var i = 0; i < this.els.length; i++) {
            this.els[i].style[this.property] = style;
        }
    },
    getStyle: function (state) {
        state = this.from + (this.to - this.from) * state;
        if (this.property == 'filter') return 'alpha(opacity=' + Math.round(state * 100) + ')';
        if (this.property == 'opacity') return state;
        return Math.round(state) + this.units;
    },
};

// animates a colour based style property between two hex values
var ColorStyleSubject = Class.create();
ColorStyleSubject.prototype = {
    // animate el.style[property] between from and to
    initialize: function (els, property, from, to) {
        this.els = Animator.makeArray(els);
        this.property = property.camelize();
        this.to = this.expandColor(to);
        this.from = this.expandColor(from);
    },
    // parse "#FFFF00" to [256, 256, 0]
    expandColor: function (color) {
        var hexColor, red, green, blue;
        hexColor = ColorStyleSubject.parseColor(color);
        if (hexColor) {
            red = parseInt(hexColor.slice(1, 3), 16);
            green = parseInt(hexColor.slice(3, 5), 16);
            blue = parseInt(hexColor.slice(5, 7), 16);
            return [red, green, blue];
        }
        if (window.DEBUG) {
            alert("Invalid colour: '" + color + "'");
        }
    },
    getValueForState: function (color, state) {
        return Math.round(this.from[color] + (this.to[color] - this.from[color]) * state);
    },
    setState: function (state) {
        var color = '#' + this.getValueForState(0, state).toColorPart() + this.getValueForState(1, state).toColorPart() + this.getValueForState(2, state).toColorPart();
        for (var i = 0; i < this.els.length; i++) {
            this.els[i].style[this.property] = color;
        }
    },
};

// return a properly formatted 6-digit hex colour spec, or false
ColorStyleSubject.parseColor = function (string) {
    var color = '#',
        match;
    if ((match = ColorStyleSubject.parseColor.rgbRe.exec(string))) {
        var part;
        for (var i = 1; i <= 3; i++) {
            part = Math.max(0, Math.min(255, parseInt(match[i])));
            color += part.toColorPart();
        }
        return color;
    }
    if ((match = ColorStyleSubject.parseColor.hexRe.exec(string))) {
        if (match[1].length == 3) {
            for (var i = 0; i < 3; i++) {
                color += match[1].charAt(i) + match[1].charAt(i);
            }
            return color;
        }
        return '#' + match[1];
    }
    return false;
};
ColorStyleSubject.parseColor.rgbRe = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i;
ColorStyleSubject.parseColor.hexRe = /^\#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

// animates between two styles defined using CSS
var CSSStyleSubject = Class.create();
CSSStyleSubject.prototype = {
    // if style1 and style2 are present, animate between them, if only style1
    // is present, animate between the element's current style and style1
    initialize: function (els, style1, style2) {
        els = Animator.makeArray(els);
        this.subjects = [];
        if (els.length == 0) return;
        var prop, toStyle, fromStyle;
        if (style2) {
            fromStyle = this.parseStyle(style1);
            toStyle = this.parseStyle(style2);
        } else {
            toStyle = this.parseStyle(style1);
            fromStyle = {};
            for (prop in toStyle) {
                fromStyle[prop] = CSSStyleSubject.getStyle(els[0], prop);
            }
        }
        // discover the type (numerical or colour) of each style
        var prop, from, to, units, match, type;
        for (prop in fromStyle) {
            if (!toStyle[prop]) {
                if (window.DEBUG) alert("No to style provided for '" + prop + '"');
                continue;
            }
            if ((from = ColorStyleSubject.parseColor(fromStyle[prop]))) {
                to = ColorStyleSubject.parseColor(toStyle[prop]);
                type = ColorStyleSubject;
            } else if ((match = CSSStyleSubject.numericalRe.exec(fromStyle[prop]))) {
                from = parseInt(fromStyle[prop]);
                to = parseInt(toStyle[prop]);
                type = NumericalStyleSubject;
                units = match[1] || CSSStyleSubject.numericalRe.exec(toStyle[prop])[1];
            } else {
                if (window.DEBUG) {
                    alert('Unrecognised format for value of ' + prop + ": '" + fromStyle[prop] + "'");
                }
                continue;
            }
            this.subjects[this.subjects.length] = new type(els, prop, from, to, units);
        }
    },
    // parses "width: 400px; color: #FFBB2E" to {width: "400px", color: "#FFBB2E"}
    parseStyle: function (style) {
        var styles = style.split(';');
        var rtn = {};
        for (var i = 0; i < styles.length; i++) {
            var parts = CSSStyleSubject.ruleRe.exec(styles[i]);
            if (parts) {
                rtn[parts[1]] = parts[2];
            }
        }
        return rtn;
    },
    setState: function (state) {
        for (var i = 0; i < this.subjects.length; i++) {
            this.subjects[i].setState(state);
        }
    },
};
CSSStyleSubject.getStyle = function (el, rule) {
    var style;
    if (document.defaultView && document.defaultView.getComputedStyle) {
        style = document.defaultView.getComputedStyle(el, '').getPropertyValue(rule);
        if (style) {
            return style;
        }
    }
    rule = rule.camelize();
    if (el.currentStyle) {
        style = el.currentStyle[rule];
    }
    return style || el.style[rule];
};

CSSStyleSubject.ruleRe = /^\s*([a-zA-Z\-]+)\s*:\s*(\S(.+\S)?)\s*$/;
CSSStyleSubject.numericalRe = /^\d+(%|[a-zA-Z]{2})?$/;

// an Accordion is a class that creates and controls a number of Animators. An array of elements is passed in,
// and for each element an Animator and a activator button is created. When an Animator's activator button is
// clicked, the Animator and all before it seek to 0, and all Animators after it seek to 1. This can be used to
// create the classic Accordion effect, hence the name.
var Accordion = Class.create();
Accordion.prototype = {
    // construct - see setOptions for parameters
    initialize: function (options) {
        this.setOptions(options);
        var selected = this.options.initialSection,
            current;
        if (this.options.rememberance) {
            current = document.location.hash.substring(1);
        }
        this.rememberanceTexts = [];
        this.ans = [];
        for (var i = 0; i < this.options.sections.length; i++) {
            var el = this.options.sections[i];
            var an = new Animator(this.options.animatorOptions);
            var from = this.options.from + this.options.shift * i;
            var to = this.options.to + this.options.shift * i;
            an.addSubject(new NumericalStyleSubject(el, this.options.property, from, to, this.options.units));
            an.jumpTo(0);
            var activator = this.options.getActivator(el);
            activator.onclick = this.show.bind(this, i);
            this.ans[this.ans.length] = an;
            this.rememberanceTexts[i] = activator.innerHTML.replace(/\s/g, '');
            if (this.rememberanceTexts[i] === current) {
                selected = i;
            }
        }
        this.show(selected);
    },
    // apply defaults
    setOptions: function (options) {
        this.options = Object.extend(
            {
                // an array of elements to use as the accordion sections
                sections: null,
                // a function that locates an activator button element given a section element.
                // by default it takes a button id from the section's "activator" attibute
                getActivator: function (el) {
                    return $(el.getAttribute('activator'));
                },
                // shifts each animator's range, for example with options {from:0,to:100,shift:20}
                // the animators' ranges will be 0-100, 20-120, 40-140 etc.
                shift: 0,
                // the first page to show
                initialSection: 0,
                // if set to true, document.location.hash will be used to preserve the open section across page reloads
                rememberance: true,
                // constructor arguments to the Animator objects
                animatorOptions: {},
            },
            options || {}
        );
    },
    show: function (section) {
        for (var i = 0; i < this.ans.length; i++) {
            this.ans[i].seekTo(i > section ? 1 : 0);
        }
        if (this.options.rememberance) {
            document.location.hash = this.rememberanceTexts[section];
        }
    },
};
