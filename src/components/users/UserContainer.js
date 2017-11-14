import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'
import { fetchUserEmails } from '../../services/UserServices.js'
import LoginForm from './LoginForm.js'
import EmailContainer from '../emails/EmailContainer.js'

class UserContainer extends Component {

  state = {
    user: null
  }

  submitUserInfo = (input) => {
    console.log("submitted form")
    fetchUserEmails(input).then(user => {
      this.setState({ user })
    })
  }

  render(){
    return(
      <div>
        <Route path="/" render={()=>(
          this.state.user ? (
            < Redirect to={`/users/${this.state.user.id}/emails`} />
          ) : (
            <Redirect to='/sign-in'/>
          )
        )}/>
        <Route exact path='/sign-in' render={()=>(
            <LoginForm submitUserInfo={this.submitUserInfo}/>
        )}/>
        <Route path={`/users/:id/emails`} render={(props) => (
          this.state.user ? (
            <EmailContainer
              {...props}
              user={this.state.user}
              sent_emails={this.state.user.sent_emails}
              received_emails={this.state.user.received_emails}
            />
          ) : (
            <Redirect to='/sign-in'/>
          )
        )}/>
      </div>
    )
  }
}

export default UserContainer
