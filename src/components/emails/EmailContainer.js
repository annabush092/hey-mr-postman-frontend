import React, { Component } from 'react'
import EmailList from './EmailList.js'
import { markAsRead } from '../../services/UserServices.js'


class EmailContainer extends Component{
  state = {
    emailFilter: "received_emails",
    // sent_emails
    // received_emails
    readEmails: []
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
      .then(json => console.log("WE MADE IT AAAAAAAH", json))
    }
  }

  render(){
    console.log("in emailcontainer: ", this.props)
    const filteredEmails = this.props[this.state.emailFilter]
    return(
      <div>
        <form>
          <select onChange={this.handleSelect} selected={this.state.emailFilter}>
            <option value="received_emails">Received</option>
            <option value="sent_emails">Sent</option>
          </select>
        </form>
        <EmailList emails={filteredEmails} readEmails={this.state.readEmails} handleOpenEmail={this.handleOpenEmail} emailFilter={this.state.emailFilter}/>
      </div>
    )
  }
}

export default EmailContainer
