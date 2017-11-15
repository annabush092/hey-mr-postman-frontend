import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavBar.css'

export default class NavBar extends React.Component {
  render() {
    return (
      <div id="NavBar">
        <p><NavLink to={`/users/${this.props.id}/new`}>Compose Mail</NavLink></p>
        <hr/>
        <p><NavLink to="/sign-in">Sign Out</NavLink></p>
      </div>
    )
  }
}
