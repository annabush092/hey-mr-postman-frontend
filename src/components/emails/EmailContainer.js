import React, { Component } from 'react'
import EmailList from './EmailList.js'

class EmailContainer extends Component{
  state = {
    emailFilter: "received_emails"
    // sent_emails
    // received_emails
  }

  handleSelect = (ev) => {
    this.setState({
      emailFilter: ev.target.value
    })
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
        <EmailList emails={filteredEmails}/>
      </div>
    )
  }
}

export default EmailContainer
