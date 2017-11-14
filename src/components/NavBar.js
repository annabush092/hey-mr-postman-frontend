import React from 'react';
import {NavLink} from 'react-router-dom';

export default class NavBar extends React.Component {
  render() {
    return (
      <div>
        <NavLink to="/sign-in">Sign Out</NavLink>
        <NavLink to="/users/:id/emails/received">Inbox</NavLink>
        <NavLink to="/users/:id/emails/sent">Sent Mail</NavLink>
        <NavLink to="/users/:id/emails/new">Compose Mail</NavLink>
      </div>
    )
  }
}
