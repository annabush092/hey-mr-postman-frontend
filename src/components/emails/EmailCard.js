import React, { Component } from 'react'


class EmailCard extends Component{
  render(){
    console.log("in EmailCard: ", this.props)
    return(
      <div>
        <ul>
          <li>To: {this.props.recipient_id}</li>
          <li>From: {this.props.user}</li>
          <li>Subject: {this.props.subject}</li>
        </ul>
        <p>Dear {this.props.recipient_id},</p>
        <p>{this.props.content}</p>
        <p>With Love,</p>
        <p>{this.props.user}</p>
        <hr/>
      </div>
    )
  }
}

export default EmailCard
