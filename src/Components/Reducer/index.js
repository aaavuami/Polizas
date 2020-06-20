import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import mensajeReducer from '../Store/mensajeReducer';
import polizasReducer from '../Store/polizasReducer';
import reclamosReducer from '../Store/reclamosReducer';

const rootReducer = combineReducers({
    mensajes: mensajeReducer,
    polizasR: polizasReducer,
    reclamosR: reclamosReducer
});

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || compose;

export default function generateStore() {
    const storeMensaje = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    return storeMensaje;
}