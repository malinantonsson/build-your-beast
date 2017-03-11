const React = require('react');
const ReactDOM = require('react-dom');

// router
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const Navigation = ReactRouter.Navigation;
/* 
    App
    <app/>
*/

var App = React.createClass({

    render: function() {
        return (
            <div className="catch-of-the-day">
        		<Intro />
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                </div>
            </div>
        )
    }
});


/* 
    Header
    <Header/>
*/

var Intro = React.createClass({

    render: function() {
        return (
            <intro>
                <h2>This is the intro</h2>
            </intro>
        )
    }
});

/* 
    Header
    <Header/>
*/

var Header = React.createClass({

    render: function() {
        return (
            <header className="top">
                <h1>Build your beast</h1>
                <h3 className="tagline"><span>{this.props.tagline}</span></h3>
            </header>
        )
    }
});


/* 
    Routes
*/
/*
var routes = (
    <Router>
        <Router path="/" component={StorePicker} />
        <Router path="/store/:storeId" component={App} />
    </Router>
)

ReactDOM.render(<routes/>, document.querySelector('#main'));*/

ReactDOM.render(<App/>, document.querySelector('#main'))

/*ReactDOM.render(<App/>, document.querySelector('#main'));*/