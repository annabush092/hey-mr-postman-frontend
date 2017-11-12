//Create:

export const sendEmail = (props) => {
  return fetch(`http://localhost:3000/api/v1/emails`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: props.user_id,
      recipient_email: props.recipient_email,
      subject: props.subject,
      content: props.content,
      sent: true,
      read: false
    })
  })
  .then(res => res.json())
}


//Update:

export const markAsRead = (emailProps) => {
  return updateEmail({
    id: emailProps.id,
    user_id: emailProps.user.id,
    recipient_id: emailProps.recipient.id,
    subject: emailProps.subject,
    content: emailProps.content,
    sent: emailProps.sent,
    read: 'true'
  })
}

const updateEmail = (emailProps) => {
  return fetch(`http://localhost:3000/api/v1/emails/${emailProps.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: emailProps.user_id,
      recipient_id: emailProps.recipient_id,
      subject: emailProps.subject,
      content: emailProps.content,
      sent: emailProps.sent,
      read: emailProps.read
    })
  })
  .then(res => res.json())
}
