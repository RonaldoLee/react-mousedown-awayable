# react-mousedown-awayable
Mousedown away mixin for react component.

## Installation
```
npm install --save react-mousedown-awayable
```

## Usage
```javascript
var React = require("react");
var MousedownAwayable = require("react-mousedown-awayable");
var Rect = React.createClass({
    mixins: [MousedownAwayable],
    componentMouseDownAway: function() {
        // MouseDownAway triggered callback code here
    },
    render: function() {
    }
});
```