
/**
 * First we will load all of this project's JavaScript dependencies
 * It's a great starting point while building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap')

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import React from 'react'
import { AppContainer as HMRWrapper } from 'react-hot-loader'
import { render } from 'react-dom'
import createStore from 'admin/store/createStore'

import AppContainer from 'admin/containers/AppContainer'

/**
 * Node for react app to attach
 */
const mountNODE = document.getElementById('app')

/**
 * Mount whole app
 */
if (mountNODE) {
    // Create store instance
    const initialState = window.__INITIAL_STATE__
    const store = createStore(initialState)

    // The red box (aka red screen of death) renders an error in “pretty” format
    // Disabled in production
    if (process.env.NODE_ENV !== 'production') {
        const RedBox = require('redbox-react').default

        try {
            render(
                <HMRWrapper>
                    <AppContainer store={store} />
                </HMRWrapper>,
                mountNODE
            )
        } catch (e) {
            render(<RedBox error={e} />, mountNODE)
        }
    } else {
        render(
            <HMRWrapper>
                <AppContainer store={store} />
            </HMRWrapper>,
            mountNODE
        )
    }
}

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept()
}
