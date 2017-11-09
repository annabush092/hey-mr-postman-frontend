import React, { Component } from 'react'
import { fetchUserEmails } from '../services/UserServices.js'

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
      console.log(this.state.user.emails)
    })
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label> Enter Name </label>
          <input type="text" onChange={this.handleChange} value={this.state.input} />
          <input type="submit" />
        </form>
      </div>

    )
  }
}

export default UserContainer
