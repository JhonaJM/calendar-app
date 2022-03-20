import React from 'react'
import {Provider} from 'react-redux';

import { store } from './store/store';

import { BrowserRouter  } from "react-router-dom";
import { AppRouter } from './routers/AppRouter';
import './styles/styles.css';
export const CalendarApp = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppRouter>                
                </AppRouter>
            </BrowserRouter>
        </Provider>
    )
}
