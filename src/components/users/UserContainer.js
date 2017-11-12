import React, { Component } from 'react'
import { fetchUserEmails } from '../../services/UserServices.js'
import LoginForm from './LoginForm.js'
import EmailContainer from '../emails/EmailContainer.js'

class UserContainer extends Component {

  state = {
    user: null
  }

  submitUserInfo = (input) => {
    fetchUserEmails(input).then(user => {
      this.setState({ user })
    })
  }

  renderEmails = () => {
    if(this.state.user){
      return (
        <EmailContainer
          user={this.state.user}
          sent_emails={this.state.user.sent_emails}
          received_emails={this.state.user.received_emails}
        />)
    } else {
      return ""
    }
  }

  render(){
    return(
      <div>
        <LoginForm submitUserInfo={this.submitUserInfo}/>
        {this.state.user ? <h2>Welcome, {this.state.user.name}</h2> : null}
        {this.renderEmails()}
      </div>
    )
  }
}

export default UserContainer
