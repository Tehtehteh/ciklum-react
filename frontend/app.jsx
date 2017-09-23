import React from 'react';
import {Route, Switch, BrowserRouter } from 'react-router-dom';
import Articles from './components/articles'
import Article from './components/article'
import Drafts from './components/drafts'
import Header from './components/header'
import ReactDOM from 'react-dom';

class Application extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter >
            <div>
            <Header title="Navbar" />
                <Switch>
                    <Route path="/fb/results" component={Drafts} />
                    <Route path="/fb" component={Article} />
                    <Route path="" component={Articles}/>
                </Switch>
            </div>
        </BrowserRouter >
      </div>
    );
  }
}

export {Application};


ReactDOM.render(<Application/>, document.getElementById('app'));
