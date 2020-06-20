import React, { Component } from 'react';
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './app.css';
import { Layout } from '../Menu/layout';
import Mensaje from '../Mensaje'
import Poliza from '../Poliza'
import Reclamo from '../Reclamo'
import Contabilidad from '../Contabilidad'
import Instrucciones from '../Instruccion'

const App = () => {

    return(
        <>
            <Router>
                <Layout>
                    <Switch>
                        <Route exact path='/instruccion'  component={Instrucciones} />
                        <Route exact path='/poliza'       component={Poliza} />
                        <Route exact path='/reclamo'      component={Reclamo} />
                        <Route exact path='/contabilidad' component={Contabilidad} />
                        <Route exact path='/'             component={Poliza} />
                    </Switch>
                </Layout>
            </Router>
            <Mensaje />
    </>
    )
}

export default App