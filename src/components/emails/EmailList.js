import React from 'react'
import EmailCard from './EmailCard.js'

const EmailList = (props) => {

/*
  props = {
    emails: [ {}, {}, filtered emails ]
    readEmails: [ email.id, email.id, emails that are read ]
    handleOpenEmail: function handleOpenEmail() in EmailContainer
    emailFilter: "received_emails" : "sent_emails"
  }
*/

  const renderEmailCards = props.emails.map((email, idx) => {
    let emailProps = {...email}
    if(props.readEmails.includes(email.id)){
      emailProps.read = true
    }
    return (
      <EmailCard
        key={idx} 
        {...emailProps}
        onReadEmail={props.handleOpenEmail}
        emailFilter={props.emailFilter}
      />
    )
  })

  return(
    <div key={props.emailFilter + props.emails[0].user.id}>
      {renderEmailCards}
    </div>
  )
}

export default EmailList
