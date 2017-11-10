import React, { Component } from 'react'
import EmailCard from './EmailCard.js'

class EmailList extends Component{
  render(){
    console.log("in EmailList", this.props)
    const emailItems = this.props.emails.map((email, idx) => {
      let emailProps = {...email}
      if(this.props.readEmails.includes(email.id)){
        emailProps.read = true
      }
      return <EmailCard key={idx} {...emailProps} onReadEmail={this.props.handleOpenEmail} emailFilter={this.props.emailFilter}/>
    })
    return(
      <div key={this.props.emailFilter}>
        {emailItems}
      </div>
    )
  }
}

export default EmailList
