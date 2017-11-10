import React, { Component } from 'react'

class EmailCard extends Component{
  constructor(props) {
    super(props)
    this.state = {
      show_details: false
    }
  }

  toggleDetails = (ev) => {
    if(this.state.show_details) {
      this.setState({show_details: false})
    }else {
      this.setState({show_details: true})
      if(this.props.emailFilter === "received_emails"){
        this.props.onReadEmail(this)
      }
    }
  }


  render(){
    console.log("in EmailCard: ", this.props)

    let details = (
      <div>
        <p>Sent? {`${this.props.sent}`}</p>
        <p>Dear {this.props.recipient.name},</p>
        <p>{this.props.content}</p>
        <p>With Love,</p>
        <p>{this.props.user.name}</p>
      </div>)

    return(
      <div>
        <ul>
          {this.props.emailFilter === "received_emails" ? <li>Read? {`${this.props.read}`}</li> : null}
          <li>To: {this.props.recipient.email_address}</li>
          <li>From: {this.props.user.email_address}</li>
          <li>Subject: {this.props.subject}</li>
        </ul>
          <button onClick={this.toggleDetails}>
            {this.state.show_details ? "Hide Email" : "Show Details"}
          </button>
          {this.state.show_details ? details : null}
        <hr/>
      </div>
    )
  }
}

export default EmailCard
