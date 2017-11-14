import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavBar.css'

export default class NavBar extends React.Component {
  render() {
    return (
      <div id="NavBar">
        <ul>
        <li><NavLink to="/sign-in">Sign Out</NavLink></li>
        <li><NavLink to={`/users/${this.props.id}/new`}>Compose Mail</NavLink></li>
        </ul>
      </div>
    )
  }
}
