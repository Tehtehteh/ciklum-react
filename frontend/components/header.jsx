import React, { Component } from 'react';
import {Link} from 'react-router-dom';


class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
                <Link className="navbar-brand" to=""><code>React app</code></Link>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" to="/fb/results">Results</Link>
                </div>
              </div>
            </nav>
        );
    }
}

export default Header;