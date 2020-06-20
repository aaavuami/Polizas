import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import App from './Components/App';
import generateStore from '../src/Components/Reducer'
const storeMensaje = generateStore();

ReactDOM.render(
  <Provider store={storeMensaje}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
