import React from 'react'
import {sendEmail} from '../../services/EmailServices.js'
import '../../App.css'

export default class NewEmailForm extends React.Component {
  // props = {user: user from EmailContainer}
  state = {
    recipientEmail: "",
    subject: "",
    content: ""
  }

  handleEmailChange = (ev) => {
    this.setState({
      recipientEmail: ev.target.value
    })
  }

  handleSubjectChange = (ev) => {
    this.setState({
      subject: ev.target.value
    })
  }

  handleContentChange = (ev) => {
    this.setState({
      content: ev.target.value
    })
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    console.log("recipientEmail: ", this.state.recipientEmail)
    console.log("subject: ", this.state.subject)
    console.log("content: ", this.state.content)
    this.setState({
      recipientEmail: "",
      subject: "",
      content: ""
    })
    sendEmail({
      user_id: this.props.user.id,
      recipient_email: this.state.recipientEmail,
      subject: this.state.subject,
      content: this.state.content
    })
    .then(json => console.log("Made it back- ", json))
  }

  render() {
    return(
        <form id="new-email-form" onSubmit={this.handleSubmit}>
          <p>
            <label>To: </label>
            <input type="email" placeholder="email" onChange={this.handleEmailChange} value={this.state.recipientEmail}/>
          </p>

          <p>From: {this.props.user.email_address}</p>

          <p>
            <label>Subject:</label>
            <input type="text" placeholder="your subject here" onChange={this.handleSubjectChange} value={this.state.subject}/>
          </p>

          <textarea rows="20" cols="75" placeholder="Compose your email here" onChange={this.handleContentChange} value={this.state.content}/>

          <p><input type="submit" value="Send"/></p>
          <hr/>
        </form>
    )
  }
}
