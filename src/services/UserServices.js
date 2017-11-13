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
