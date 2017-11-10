import React, { Component } from 'react'
import EmailCard from './EmailCard.js'

class EmailList extends Component{
  render(){
    console.log("in EmailList", this.props)
      const emailItems = this.props.emails.map((email, idx) => <EmailCard key={idx} {...email} />)
    return(
      <div>
        {emailItems}
      </div>
    )
  }
}

export default EmailList
