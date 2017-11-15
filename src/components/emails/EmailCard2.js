
import CSS3D from 'css3d';
import { randomColor } from 'randomcolor'

export function emailCardTwo(props, cssScene, glScene, addToArray) {

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
    var cubeMaterial = new CSS3D.MeshLambertMaterial({color: "#2a63bf"});
    var cubeMesh = new CSS3D.Mesh(cubeGeometry, cubeMaterial)





    cubeMesh.position.set(
          Math.random() * 1000 - 500,
          Math.random() * 600 - 300,
          Math.random() * 800 - 400)

    div.position = cubeMesh.position

    addToArray(cubeMesh);
    cssScene.add(div);
    glScene.add(cubeMesh)
  }



  //CUBE OBJECT
  // var geometry = new CSS3D.BoxGeometry(300, 125, 10) //maybe CubeGeometry
  // var material = new CSS3D.MeshLambertMaterial({color: "#a0b563"});
  // var cubeMesh = new CSS3D.Mesh(geometry, material)
  //   cubeMesh.position.set(0, 250, 0)
  //   scene.add(cubeMesh)

  //PLANE OBJECT
  // var planeMaterial = new CSS3D.MeshNormalMaterial();
  // var planeGeometry = new CSS3D.PlaneGeometry(300, 125)
  // var planeMesh = new CSS3D.Mesh( planeGeometry, planeMaterial );
  //   planeMesh.position.set(0, 0, 0)
  //   scene.add(planeMesh)

  //LIGHT1
  // var keyLight = new CSS3D.AmbientLight(0xffffff, 0.5)
  // cssScene.add(keyLight);

  //LIGHT2
  // var pointLight = new CSS3D.PointLight(0xffffff, 0.5)
  // cssScene.add(pointLight);
