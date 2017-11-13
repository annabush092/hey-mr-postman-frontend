import React from 'react'
import CSS3D from 'css3d';
// import OrbitControls from 'three-orbitcontrols'
import EmailCard from './EmailCard.js'
import {emailCardTwo} from './EmailCard2.js'
import ReactDOM from 'react-dom';
import TrackballControls from '../../ref/trackball';


class EmailList extends React.Component {

  componentDidMount() {

    this.canvasContainer = document.getElementById("email-list")
    //CAMERA
    this.camera = new CSS3D.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(0, 0, 2000)


    const controls = new TrackballControls(this.camera, this.canvasContainer);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    this.controls = controls;

    //CAMERA CONTROLS NEED TO IMPORT ORBIT LIBRARY
    // this.controls = OrbitControls({rotateSpeed: 1.0, zoomSpeed: 1.2})
    // this.controls.copyInto(this.camera.position, this.camera.direction, this.camera.up)
    // console.log(OrbitControls)

      // console.log("in controls", this.controls)
      // this.controls.rotateSpeed = 1.0;
      // this.controls.zoomSpeed = 1.2;
      // this.controls.panSpeed = 0.8;

    //CSS3D SCENE
    this.cssScene = new CSS3D.Scene();

    //canvas container


    //CSSRENDERER
    this.renderer2 = new CSS3D.CSS3DRenderer();
    this.renderer2.setSize(500, 500);
    // this.renderer2.domElement.style.position = 'absolute';
    this.renderer2.domElement.style.top = 0;
    this.canvasContainer.appendChild(this.renderer2.domElement);

    //Render Children
    this.props.emails.forEach((email, idx) => {
      let emailProps = {...email}
      if(this.props.readEmails.includes(email.id)){
        emailProps.read = true
      }
      emailCardTwo(emailProps, this.cssScene)
    })

    //start animation
    function renderScene() {
      this.controls.update()
      this.renderer2.render(this.cssScene, this.camera)
      requestAnimationFrame(renderScene.bind(this))
    }
    requestAnimationFrame(renderScene.bind(this))

  }



/*
  props = {
    emails: [ {}, {}, filtered emails ]
    readEmails: [ email.id, email.id, emails that are read ]
    handleOpenEmail: function handleOpenEmail() in EmailContainer
    emailFilter: "received_emails" : "sent_emails"
  }
*/

  //


  // const email1 = props.emails[0]
  //
  // const forCard = <EmailCardTwo {...email1}/>




  render() {

    return(
    <div>
    HELLO
    </div>
    )
  }

}


export default EmailList
// {renderEmailCards}
// {requestAnimationFrame(this.renderScene)}
// <div key={props.emailFilter + props.emails[0].user.id}>
// {renderEmailCards}
// </div>
