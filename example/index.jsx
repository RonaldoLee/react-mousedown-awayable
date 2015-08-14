'use strict';

var React = require("react");
var MousedownAwayable = require("react-mousedown-awayable");

var Rect = React.createClass({
    mixins: [MousedownAwayable],

    componentMouseDownAway: function() {
        this.dismiss();
    },

    getInitialState: function() {
        return {
            shown: false
        }
    },

    dismiss: function() {
        this.setState({
            shown: false
        });
    },

    show: function() {
        this.setState({
            shown: true
        });
    },

    render() {
        var styles = {
            rect: {
                width: 200,
                height: 250,
                padding: 10,
                marginTop: 20,
                backgroundColor: "rgb(110, 158, 207)",
                boxShadow: "0px 0px 6px rgba(0, 0, 0, .5)",
                display: this.state.shown ? "block" : "none"
            }
        };
        return (
            <div style={styles.rect}>
                Mousedown away to dismiss.
            </div>
        );
    }
});

var Example = React.createClass({
    render: function(){

        return (
            <div>
                <input type="button" value="Show Rectangle" onClick={this._handleButtonClicked} />
                <Rect ref="rect" />
            </div>
        );
    },

    _handleButtonClicked() {
        this.refs.rect.show();
    }
});

React.render(<Example />, document.getElementById('content'));