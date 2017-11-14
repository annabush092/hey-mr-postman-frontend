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
      <div id="Container">

        {this.state.user ? (
          < Redirect to={`/users/${this.state.user.id}`} />
        ) : (
          < Redirect to='/sign-in' />
        )}

        <div id="SideBar">
          <Route exact path={"/sign-in"} render={(props) => (<LoginForm submitUserInfo={this.submitUserInfo}/>)}/>
        </div>

        <Route path={"/users/:id"} render={(props) => (
          <EmailContainer {...props} user={this.state.user} sent_emails={this.state.user.sent_emails} received_emails={this.state.user.received_emails}/>
        )}/>

      </div>
    )
  }
}

export default UserContainer










// <LoginForm submitUserInfo={this.submitUserInfo}/>
// <Route path={'/users/' + ":id"} render={(props) => (
//     <EmailContainer
//       {...props}
//       user={this.state.user}
//       sent_emails={this.state.user.sent_emails}
//       received_emails={this.state.user.received_emails}
//     />)}
// />
