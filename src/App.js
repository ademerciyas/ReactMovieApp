import React, {Component} from 'react';
import Header from './components/elements/Header/Header';
import Home from './components/Home/Home';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Movie from "./components/Movie/Movie";


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <div className="App">
                        <Header/>
                        <Switch>
                            <Route path="/" component={Home} exact/>
                            <Route path="/:movieId" component={Movie} exact/>
                        </Switch>
                    </div>
                </React.Fragment>
            </BrowserRouter>

        );
    }
}

export default App;
