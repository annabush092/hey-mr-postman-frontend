import CSS3D from 'css3d';
import { randomColor } from 'randomcolor'

export function emailCardTwo(props, cssScene, glScene, addToArray, handleOpenEmail) {

    // Create email div
    let emailColor = randomColor();
    let emailDiv = document.createElement('div');
    emailDiv.style.cssText = `
      width: 305px;
      height: 200px;
      background: ${emailColor};
      color: black;
      fontSize: 2em;
    `

    //Create email overview div
    let element = document.createElement('div');
    element.innerHTML = `
      <h3>To: ${props.recipient.name}</h3>
      <h3>From: ${props.user.name}</h3>
      <p>Subject: ${props.subject}</p>
    `
    element.style.cssText = `
      width: 305px;
      background: ${emailColor};
      padding-left: 2em;
      padding-right: 2em;
      padding-top: 2em;
      padding-bottom: 2em;
    `
    emailDiv.appendChild(element)

    //Create show button
    let showButton = document.createElement('BUTTON');
    showButton.innerHTML= "See details"
    element.appendChild(showButton)

    //Create email content
    let emailContent = document.createElement('div')
    emailContent.setAttribute("id", `email-content-${props.user.id}`)
    emailContent.style.cssText = `
      background: ${emailColor};
      width: 100%;
      padding-left: 2em;
      padding-right: 2em;
      padding-bottom: 2em;
    `
    emailDiv.appendChild(emailContent)

    //add event listener to showButton to add/remove emailContent
    showButton.addEventListener("click", ()=> {
      if (emailContent.innerHTML === ""){
        emailContent.innerHTML = props.content
      } else {
        emailContent.innerHTML = ""
      }

      //mark email as read (if it is a received unread email)
      handleOpenEmail(props)
    })

    //CUBE OBJECT for dragging functionality
    let div = new CSS3D.CSS3DObject(emailDiv);

    var cubeGeometry = new CSS3D.CubeGeometry(300, 200, 10) //maybe CubeGeometry
    var cubeMaterial = new CSS3D.MeshLambertMaterial({color: "#2a63bf"});
    var cubeMesh = new CSS3D.Mesh(cubeGeometry, cubeMaterial)

    cubeMesh.position.set(
          Math.random() * 1000 - 500,
          Math.random() * 950 - 475,
          Math.random() * 800 - 400)
    div.position = cubeMesh.position

    addToArray(cubeMesh);

    //render email
    cssScene.add(div);
    glScene.add(cubeMesh)
  }
