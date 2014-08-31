/** @jsx React.DOM */
'use strict';

var outer = React.createClass({

    getInitialState: function () {

        return this.props.model; // probably an anti-pattern; use name property to pull state from factory object
    },

    toggleDisplay: function () {
        this.setState({ visible: !this.state.visible });
    },

    render: function () {

        var model = this.state;

        var classes = React.addons.classSet({
            'jumbotron': true,
            'hide': !model.visible
        });

        var child = React.addons.cloneWithProps(React.Children.only(this.props.children), {
            model: this.state,
            toggleDisplay: this.toggleDisplay
        });

        return (
            <div className={classes}><h4>Wrapper of {model.name}</h4>{child}</div>
            );
    }
});

var inner = React.createClass({

    toggleDisplay: function (event) {
        this.props.toggleDisplay();
    },
    render: function () {

        var model = this.props.model;

        return (
            <div className="well"><h5>Implementation of {model.message}</h5>
                <input type="checkbox" checked={model.visible} onChange={this.toggleDisplay} /> Show
            </div>
            );
    }
});

var app = React.createClass({

    render: function() {

        var models = this.props.data.map(function(item, i){

            return <outer key={i} model={item} ><inner /></outer>
        });

        return (
            <div><h2>React</h2>{models}</div>
            );
    }
});

React.renderComponent(
    <app data={window.FormData} />, document.getElementById('react')
    // later we can wrap the reference to window.FormData in a factory object, and eventually have the object fetch the data from the server
);