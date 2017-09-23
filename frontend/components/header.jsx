import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
              <a className="navbar-brand" href="/"><code>React app</code></a>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <a className="nav-item nav-link" href="/fb/results">Results</a>
                </div>
              </div>
            </nav>
        );
    }
}

export default Header;