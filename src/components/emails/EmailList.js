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

    //Click and Drag functionality
    this.canvasContainer.addEventListener('mousedown', this.onDocumentMouseDown, false);
    this.canvasContainer.addEventListener('mousemove', this.onDocumentMouseMove, false);
    this.canvasContainer.addEventListener('mouseup', this.onDocumentMouseUp, false);
    this.emailsArray = [];

    // CANVAS for clickNdrag
    // this.renderer = new CSS3D.WebGLRenderer({ antialias: true });
    // this.renderer.setClearColor(0xffffff, 1)
    // this.renderer.setSize(500, 500);
    // // this.renderer.domElement.style.position = 'absolute';
    // // this.renderer.domElement.style.zIndex = 5;
    // this.canvasContainer.appendChild(this.renderer.domElement);

    // SCENE for clickNdrag
    // this.scene = new CSS3D.Scene();
    this.raycaster = new CSS3D.Raycaster()
    this.selection = null
    //
    // //LIGHT1
    // var keyLight = new CSS3D.AmbientLight(0xffffff, 0.5)
    // this.scene.add(keyLight);
    //
    // //LIGHT2
    // var pointLight = new CSS3D.PointLight(0xffffff, 0.5)
    // this.scene.add(pointLight);

    //CUBE OBJECT
    // var geometry = new CSS3D.CubeGeometry(100, 100, 100) //maybe CubeGeometry
    // var material = new CSS3D.MeshBasicMaterial({color: "#a0b563"});
    // var cubeMesh = new CSS3D.Mesh(geometry, material)
    //   cubeMesh.position.set(0, 0, 0)
    //   this.scene.add(cubeMesh)

    // Camera offset
    this.offset = new CSS3D.Vector3()

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

    // PLANE for clickNdrag
    this.plane = new CSS3D.Mesh(new CSS3D.PlaneGeometry(500, 500, 8, 8), new CSS3D.MeshBasicMaterial({color: 0xffffff}));
    this.plane.visible = false;
    this.cssScene.add(this.plane);

    //CSSRENDERER
    this.renderer2 = new CSS3D.CSS3DRenderer();
    this.renderer2.setSize(500, 500);
    // this.renderer2.domElement.style.position = 'absolute';
    // this.renderer2.domElement.style.top = 0;
    this.canvasContainer.appendChild(this.renderer2.domElement);

    //Render Children
    this.props.emails.forEach((email, idx) => {
      let emailProps = {...email}
      if(this.props.readEmails.includes(email.id)){
        emailProps.read = true
      }
      emailCardTwo(emailProps, this.cssScene, this.addToArray.bind(this))
    })

    //start animation
    function renderScene() {
      this.controls.update()
      // this.renderer.render(this.scene, this.camera)
      this.renderer2.render(this.cssScene, this.camera)
      requestAnimationFrame(renderScene.bind(this))
    }
    requestAnimationFrame(renderScene.bind(this))

  }

  addToArray = (obj) => {
    this.emailsArray.push(obj)
  }

  onDocumentMouseDown = (event) => {
    console.log("CLICKED")
    // Get mouse position
    let mouseX = (event.clientX / 500) * 2 - 1;
    let mouseY = -(event.clientY / 500) * 2 + 1;
    // Get 3D vector from 3D mouse position using 'unproject' function
    let vector = new CSS3D.Vector3(mouseX, mouseY, 1);
    // Set the raycaster position
    this.raycaster.set( this.camera.position, vector.sub( this.camera.position ).normalize() );
    // Find all intersected objects
    let intersects = this.raycaster.intersectObjects(this.emailsArray);
    console.log(this.raycaster)
    if (intersects.length > 0) {
      // Disable the controls
      this.controls.enabled = false;
      // Set the selection - first intersected object
      this.selection = intersects[0].object;
      // Calculate the offset
      intersects = this.raycaster.intersectObject(this.plane);
      this.offset.copy(intersects[0].point).sub(this.plane.position);
    }
  }

  onDocumentMouseMove = (event) => {
    console.log("MOVED", this.emailsArray)
    event.preventDefault();
    // Get mouse position
    let mouseX = (event.clientX / 500) * 2 - 1;
    let mouseY = -(event.clientY / 500) * 2 + 1;
    // Get 3D vector from 3D mouse position using 'unproject' function
    let vector = new CSS3D.Vector3(mouseX, mouseY, 1);
    // Set the raycaster position
    this.raycaster.set( this.camera.position, vector.sub( this.camera.position ).normalize() );
    if (this.selection) {
      // Check the position where the plane is intersected
      let intersects = this.raycaster.intersectObject(this.plane);
      // Reposition the object based on the intersection point with the plane
      this.selection.position.copy(intersects[0].point.sub(this.offset));
    } else {
      // Update position of the plane if need
      let intersects = this.raycaster.intersectObjects(this.emailsArray);
      if (intersects.length > 0) {
        this.plane.position.copy(intersects[0].object.position);
        this.plane.lookAt(this.camera.position);
      }
    }
  }

  onDocumentMouseUp = (event) => {
    console.log("UNCLICKED")
    // Enable the controls
    this.controls.enabled = true;
    this.selection = null;
  }








  render() {
    return(
    <div>
    "in email list"
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
