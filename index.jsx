'use strict';

var React = require('react');

var Helpers = {
    isDescendant: function(parent, child) {
        var node = child.parentNode;

        while (node != null) {
            if (node == parent) return true;
            node = node.parentNode;
        }

        return false;
    },

    // IE8+ Support
    bind: function on(el, type, callback) {
        if (el.addEventListener) {
            el.addEventListener(type, callback);
        } else {
            el.attachEvent('on' + type, function () {
                callback.call(el);
            });
        }
    },

    // IE8+ Support
    unbind: function off(el, type, callback) {
        if (el.removeEventListener) {
            el.removeEventListener(type, callback);
        } else {
            el.detachEvent('on' + type, callback);
        }
    }
};

module.exports = {
    componentDidMount: function() {
        this._bindMouseDownAway();
    },

    componentWillUnmount: function() {
        this._unbindMouseDownAway();
    },

    _checkMouseDownAway: function(e) {
        var el = React.findDOMNode(this);

        var awayExceptions = this.props.awayExceptions ? this.props.awayExceptions() : null;

        var isException = false;

        if (awayExceptions && (e.target == awayExceptions || Helpers.isDescendant(awayExceptions, e.target))) {
            isException = true;
        }

        // Check if the target is inside the current component
        if (!isException && e.target != el &&
            !Helpers.isDescendant(el, e.target) &&
            document.documentElement.contains(e.target)) {
            if (this.componentMouseDownAway) {
                this.componentMouseDownAway();
            }
        }
    },

    _bindMouseDownAway: function() {
        Helpers.bind(document, 'mousedown', this._checkMouseDownAway);
    },

    _unbindMouseDownAway: function() {
        Helpers.unbind(document, 'mousedown', this._checkMouseDownAway);
    }
};
