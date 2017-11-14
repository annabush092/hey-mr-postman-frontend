import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavBar.css'

export default class NavBar extends React.Component {
  render() {
    return (
      <div id="NavBar">
        <NavLink to="/sign-in">Sign Out</NavLink>
        <NavLink to="/users/:id/emails/new">Compose Mail</NavLink>
      </div>
    )
  }
}
