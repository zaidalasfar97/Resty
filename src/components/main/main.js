import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../home/home.js';
import Help from '../help/help.js';
import historyDetals from '../historyDetals/historyDetals.js';


class Main extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/history" component={historyDetals} />
                    <Route path="/help" component={Help} />
                </Switch>
            </main>
        );
    }
}

export default Main;