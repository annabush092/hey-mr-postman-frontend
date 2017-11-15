import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'
import NavBar from '../NavBar.js'
import EmailList from './EmailList.js'
import FilterForm from './FilterForm.js'
import NewEmailForm from './NewEmailForm.js'
import { markAsRead, deleteEmail } from '../../services/EmailServices.js'

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
    if(!this.state.readEmails.includes(email.id) && this.state.emailFilter === "received_emails") {
      this.setState({
        readEmails: [...this.state.readEmails, email.id]
      })
      markAsRead(email)
      .then(json => console.log("WE MADE IT AAAAAAAH", this.state.readEmails))
    }
  }

  handleDeleteEmail = (emailID) => {
    deleteEmail(emailID)
    .then(json => console.log("DELETED EMAIL", json))
  }

  render(){
    const currentPath = this.props.match.url
    const filteredEmails = this.props[this.state.emailFilter]
    return(

      <div>

        {(this.state.emailFilter === "received_emails") ? (
          <Redirect to={currentPath + '/received'}/>
        ) : (
          <Redirect to={currentPath + '/sent'}/>
        )}

          <div>

            <div id="SideBar">
              Welcome,
              <h3>{this.props.user.name}</h3>
              <hr/>
              <NavBar id={this.props.user.id}/>
              <hr/>
              <FilterForm handleSelect={this.handleSelect} emailFilter={this.state.emailFilter}/>
            </div>

            <div id="CanvasContainer" key={this.state.emailFilter}>
              <Route exact path={currentPath + `/received`} render={()=>(
                <EmailList key="received-emails" emails={filteredEmails} readEmails={this.state.readEmails} handleOpenEmail={this.handleOpenEmail} handleDeleteEmail={this.handleDeleteEmail}/>
              )}/>
              <Route exact path={currentPath + `/sent`} render={()=>(
                <EmailList key="sent-emails" emails={filteredEmails} readEmails={this.state.readEmails} handleOpenEmail={this.handleOpenEmail} handleDeleteEmail={this.handleDeleteEmail}/>
              )}/>
              <Route exact path={currentPath + '/new'} render={()=>(
                <NewEmailForm key="new-email" user={this.props.user}/>
              )}/>
            </div>

          </div>

      </div>
    )
  }

}

export default EmailContainer
