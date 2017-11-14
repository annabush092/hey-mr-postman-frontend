import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'
import NavBar from '../NavBar.js'
import EmailList from './EmailList.js'
import FilterForm from './FilterForm.js'
import NewEmailForm from './NewEmailForm.js'
import { markAsRead } from '../../services/EmailServices.js'

class EmailContainer extends Component{
/*
props = {
  user: user from UserController
  sent_emails: sent_emails from UserContainer
  received_emails: received_emails from UserContainer
}
*/
  state = {
    emailFilter: "received_emails", // "sent_emails" : "received_emails"
    readEmails: []
  }

  componentDidMount() {
    this.findReadEmails()
  }

  findReadEmails = () => {
    const allRead = this.props.received_emails.reduce((acc, email) => {
      if(email.read) { acc.push(email.id) }
      return acc
    }, [])
    this.setState({
      readEmails: [...allRead]
    })
  }

  handleSelect = (ev) => {
    this.setState({
      emailFilter: ev.target.value
    })
  }

  handleOpenEmail = (email) => {
    if(!this.state.readEmails.includes(email.props.id)) {
      this.setState({
        readEmails: [...this.state.readEmails, email.props.id]
      })
      markAsRead(email.props)
      .then(json => console.log("WE MADE IT AAAAAAAH", this.state.readEmails))
    }
  }

  render(){
    const currentPath = this.props.match.url
    const filterRoute = this.state.emailFilter.split("_")[0]
    const filteredEmails = this.props[this.state.emailFilter]
    return(
      <div>
        <NavBar/>
        <h2>Welcome, {this.props.user.name}</h2>
        <FilterForm handleSelect={this.handleSelect} emailFilter={this.state.emailFilter}/>
        <Route path={currentPath} render={()=>(
          (this.state.emailFilter === "received_emails") ? (
            <Redirect to={currentPath + '/received'}/>
          ) : (
            <Redirect to={currentPath + '/sent'}/>
          )
        )}/>
        <Route exact path={currentPath + `/${filterRoute}`} render={()=>(
          <EmailList emails={filteredEmails} readEmails={this.state.readEmails}/>
        )}/>
        <Route exact path={currentPath + '/new'} render={()=>(
          <NewEmailForm user={this.props.user}/>
        )}/>
      </div>
    )
  }
}

export default EmailContainer
//
// <div id="email-list" style={{width: "500px", height: "500px"}}>
//   <EmailList emails={filteredEmails} readEmails={this.state.readEmails} handleOpenEmail={this.handleOpenEmail} emailFilter={this.state.emailFilter}/>
// </div>
