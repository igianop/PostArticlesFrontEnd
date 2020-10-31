import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Post Articles</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Articles</Link>
          </li>
          <li className="navbar-item">
          <Link to="/article" className="nav-link">Create Article</Link>
          </li>
          <li className="navbar-item">
          <Link to="/category" className="nav-link">Create Category</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}