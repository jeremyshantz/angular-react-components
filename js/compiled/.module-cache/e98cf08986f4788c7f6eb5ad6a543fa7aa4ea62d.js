/** @jsx React.DOM */

'use strict';

var outer = React.createClass({displayName: 'outer',

    getInitialState: function () {

        return this.props.model; // probably an anti-pattern; use name property to pull state from factory object
    },

    changeState: function (property, newValue) {

        var state = {};
        state[property] = newValue;

        this.setState(state);
    },
    
    render: function () {

        var model = this.state;
        var self = this;

        var classes = React.addons.classSet({
            'jumbotron': true,
            'hide': !model.visible
        });

        var child = React.addons.cloneWithProps(React.Children.only(this.props.children), {
            model: this.state,
            display: {
                value: this.state.visible,
                requestChange: function(newvalue){ self.changeState('visible', newvalue); }
            }
        });

        return (
            React.DOM.div({className: classes}, React.DOM.h4(null, "Wrapper of ", model.name), child)
            );
    }
});

var innerA = React.createClass({displayName: 'innerA',

    render: function () {

        var model = this.props.model;

        return (
            React.DOM.div({className: "well"}, React.DOM.h5(null, "Implementation of ", model.message, " - INNER A"), 
                React.DOM.input({type: "checkbox", checkedLink: this.props.display}), " Show"
            )
            );
    }
});

var innerB = React.createClass({displayName: 'innerB',

    render: function () {

        var model = this.props.model;

        return (
            React.DOM.div({className: "well"}, React.DOM.h5(null, "Implementation of ", model.message, " - INNER B"), 
                React.DOM.input({type: "checkbox", checkedLink: this.props.display}), " Show"
            )
            );
    }
});

var app = React.createClass({displayName: 'app',

    render: function() {

        var models = this.props.data.map(function(item, i){

            var func = item.controltype === 'innerA' ? innerA : innerB;

            return outer({key: i, model: item}, func(null))
        });

        return (
            React.DOM.div(null, React.DOM.h2(null, "React"), models)
            );
    }
});

React.renderComponent(
    app({data: window.FormData}), document.getElementById('react')
    // later we can wrap the reference to window.FormData in a factory object, and eventually have the object fetch the data from the server
);
