
import CSS3D from 'css3d';
import { randomColor } from 'randomcolor'

export function emailCardTwo(props, cssScene, glScene, addToArray, handleOpenEmail) {

    //HTML TO APPEND
    let element = document.createElement('div');
    let button = document.createElement('BUTTON');

    button.innerHTML= "See details"
    element.innerHTML = `
    <h3>From: ${props.user.name}</h3>
    <p>Email: ${props.user.email_address}</p>
    <p>Subject: ${props.subject}</p>
    <hr>
    `
    element.appendChild(button)
    element.className = "three-div"

    let emailContent = document.createElement('div')
    emailContent.setAttribute("id", `email-content-${props.user.id}` )
    element.appendChild(emailContent)

    let emailColor = randomColor();
    element.style.cssText = `
        width: 300px;
        height: 200px;
        background: ${emailColor};
        color: #E60000;
        fontFamily: Arial, Helvetica, Sans-serif;
        fontSize: 2em;
        padding: 2em;
        overflow: scroll;
      `


    // let contentDisplay = "none"
    // emailContent.style.cssText = `
    //     display: ${contentDisplay}
    // `


    button.addEventListener("click", ()=> {
      const  myEmailContent = document.getElementById(`email-content-${props.user.id}`)

      handleOpenEmail(props)

      if (myEmailContent.innerHTML === ""){
        myEmailContent.innerHTML += props.content

        myEmailContent.style.cssText = `
          background: ${emailColor};
        `
      } else {
        myEmailContent.innerHTML = ""
      }


      console.log("myEmailContent", typeof myEmailContent.innerHTML)

      // contentDisplay === "none" ? (contentDisplay = "block") : (contentDisplay = "none")
      // element.innerHTML += `<p> ${props.content} </p>`
    })

    let div = new CSS3D.CSS3DObject(element);

    //CUBE OBJECT
    var cubeGeometry = new CSS3D.CubeGeometry(300, 200, 10) //maybe CubeGeometry
    var cubeMaterial = new CSS3D.MeshNormalMaterial();
    var cubeMesh = new CSS3D.Mesh(cubeGeometry, cubeMaterial)

    cubeGeometry.computeFaceNormals();
    cubeGeometry.computeVertexNormals();




    cubeMesh.position.set(
          Math.random() * 1000 - 500,
          Math.random() * 950 - 475,
          Math.random() * 800 - 400)

          console.log(cubeMesh.position)

    div.position = cubeMesh.position


    addToArray(cubeMesh);
    cssScene.add(div);
    glScene.add(cubeMesh)
  }
