import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './modules/app/App.component';
// import {HashRouter as Router} from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Auth0ProviderWithHistory } from "./auth/auth0-provider-with-history";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Auth0ProviderWithHistory>
                <App />
            </Auth0ProviderWithHistory>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

