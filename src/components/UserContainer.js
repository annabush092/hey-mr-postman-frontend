import React, { Component } from 'react'
import { fetchUserEmails } from '../services/UserServices.js'
import EmailContainer from './emails/EmailContainer.js'

class UserContainer extends Component {

  state = {
    input: "",
    user: {}
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetchUserEmails(this.state.input).then(user => {
      this.setState({ user })
    })
  }

  render(){
    console.log("in User", this.state.user)
    let emailList = ""
    if(Object.keys(this.state.user).length > 0 ){
      emailList = <EmailContainer sent_emails={this.state.user.sent_emails} received_emails={this.state.user.received_emails}/>
      }

    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label> Enter Name </label>
          <input type="text" onChange={this.handleChange} value={this.state.input} />
          <input type="submit" />
        </form>
        {emailList}
      </div>

    )
  }
}

export default UserContainer
