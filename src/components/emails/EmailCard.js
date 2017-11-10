import React, { Component } from 'react'

class EmailCard extends Component{
  render(){
    console.log("in EmailCard: ", this.props)
    return(
      <div>
        <ul>
          <li>To: {this.props.recipient.email_address}</li>
          <li>From: {this.props.user.email_address}</li>
          <li>Subject: {this.props.subject}</li>
          <li>Sent? {`${this.props.sent}`}</li>
          <li>Read? {`${this.props.read}`}</li>
        </ul>
        <p>Dear {this.props.recipient.name},</p>
        <p>{this.props.content}</p>
        <p>With Love,</p>
        <p>{this.props.user.name}</p>
        <hr/>
      </div>
    )
  }
}

export default EmailCard
