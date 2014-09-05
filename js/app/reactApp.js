/** @jsx React.DOM */

'use strict';

var outer = React.createClass({

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
            <div className={classes}><h4>Wrapper of {model.name}</h4>{child}</div>
            );
    }
});

var innerA = React.createClass({

    render: function () {

        var model = this.props.model;

        return (
            <div className="well"><h5>Implementation of {model.message} - INNER A</h5>
                <input type="checkbox" checkedLink={this.props.display} /> Show
            </div>
            );
    }
});

var innerB = React.createClass({

    render: function () {

        var model = this.props.model;

        return (
            <div className="well"><h5>Implementation of {model.message} - INNER B</h5>
                <input type="checkbox" checkedLink={this.props.display} /> Show
            </div>
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
    <app data={window.FormData} />, document.getElementById('react')
    // later we can wrap the reference to window.FormData in a factory object, and eventually have the object fetch the data from the server
);
