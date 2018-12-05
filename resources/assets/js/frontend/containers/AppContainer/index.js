import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// Entry point for some global styling
import 'frontend/styles/global.sass'

export default class AppContainer extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
    }

    render() {
        const { store } = this.props

        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Route path="/" exact component={HomeView} />
                        <Route path="/test" component={TestView} />
                    </div>
                </Router>
            </Provider>
        )
    }
}

const HomeView = () => (
    <div className="container home">
        <div className="card-body">
            Homepage
        </div>
        <Link to="/test">Go to Test</Link>
        {' '}
        <a href="/admin/index">Go to admin</a>
    </div>
)

const TestView = props => {
    return (
        <div className="container test">
            <div className="card-body">
                Test page
            </div>
            <Link to="/">Go to Home</Link>
        </div>
    )
}
