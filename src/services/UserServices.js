export function fetchUserEmails(nameParams){
  return fetch('http://localhost:3000/api/v1/login/',
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: nameParams})
    })
    .then(res => res.json())
}

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
  console.log("INSIDE ALMOST FETCH: ", emailProps)
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
