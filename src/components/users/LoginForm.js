import React from 'react'
import '../../App.css'

export default class LoginForm extends React.Component {
  state = {
    input: ""
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let input = this.state.input
    this.props.submitUserInfo(input)
    this.setState({
      input: ""
    })
  }

  render() {
    return (
      <div id="SignInBar">
      <form onSubmit={this.handleSubmit}>
        <label> Enter Name </label>
        <input type="text" onChange={this.handleChange} value={this.state.input} />
        <input type="submit" />
      </form>
      </div>
    )
  }
}
