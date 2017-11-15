import CSS3D from 'css3d';
import { randomColor } from 'randomcolor'

export function emailCardTwo(props, cssScene, glScene, addToArray, handleOpenEmail, handleDeleteEmail) {

    // Create email div
    let emailColor = randomColor();
    let textColor = "black";
    if(props.read) {
      textColor = "gray";
    }
    let emailDiv = document.createElement('div');
    emailDiv.style.cssText = `
      width: 300px;
      height: 205px;
      background: ${emailColor};
      color: ${textColor};
      fontSize: 2em;
    `

    //Create delete BUTTON
    let deleteDiv = document.createElement("div")
    deleteDiv.style.cssText = `
      width: 300px;
      background: ${emailColor};
      padding-left: 2em;
      padding-right: 2em;
      padding-top: 2em;
    `
    let deleteButton = document.createElement("button")
    deleteButton.innerHTML = "Delete Email"
    deleteButton.style.cssText = `
      float: right;
    `
    deleteDiv.appendChild(deleteButton)
    emailDiv.appendChild(deleteDiv)

    //Create email overview div
    let element = document.createElement('div');
    element.innerHTML += `
      </br>
      <h3>To: ${props.recipient.email_address}</h3>
      <h3>From: ${props.user.email_address}</h3>
      <p>Subject: ${props.subject}</p>
    `
    element.style.cssText = `
      width: 300px;
      background: ${emailColor};
      padding-left: 2em;
      padding-right: 2em;
      padding-bottom: 2em;
    `
    emailDiv.appendChild(element)

    //Create show button
    let showButton = document.createElement('button');
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
    showButton.addEventListener("click", () => {
      console.log("pressed show button")
      if (emailContent.innerHTML === ""){
        emailContent.innerHTML = `
          Dear ${props.recipient.name},<br>
          <p>${props.content}</p>
          <p>Love,</br>
          ${props.user.name}</p>
        `
      } else {
        emailContent.innerHTML = ""
      }

      //mark email as read (if it is a received unread email)
      handleOpenEmail(props)
    })

    //add event listener to deleteButton
    deleteButton.addEventListener("click", () => {
      console.log("pressed delete button")
      handleDeleteEmail(props.id)
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
