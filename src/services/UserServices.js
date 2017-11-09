export function fetchUserEmails(name){
  return fetch(`http://localhost:3000/api/v1/login/${name}`)
    .then(res => res.json())
}
