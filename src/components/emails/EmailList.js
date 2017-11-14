import React from 'react'
import CSS3D from 'css3d';
import {emailCardTwo} from './EmailCard2.js'
import TrackballControls from '../../ref/trackball';


class EmailList extends React.Component {

  componentDidMount() {

    this.canvas = document.getElementById("Canvas")

    this.canvasArea = this.canvas.getBoundingClientRect()




    //CSS3D SCENE
    this.cssScene = new CSS3D.Scene();

    //WEBGL SCENE
    this.glScene = new CSS3D.Scene();

    //CAMERA
    this.camera = new CSS3D.PerspectiveCamera(45, this.canvasArea.width / this.canvasArea.height, 1, 1000);
    this.camera.position.set(0, 0, 2000)
    this.camera.lookAt(this.glScene.position)

    // //LIGHT1
    var keyLight = new CSS3D.AmbientLight(0xffffff, 0.5)
    keyLight.position.set(0, 0, 500)
    this.glScene.add(keyLight);

    // //LIGHT2
    var pointLight = new CSS3D.PointLight(0xffffff, 0.5)
    pointLight.position.set(0, 0, 500)
    this.glScene.add(pointLight);


    var plane;
    var selectedObject;
    var projector = new CSS3D.Projector();
    var offset = new CSS3D.Vector3();
    this.emailsArray = [];

    //INVISIBLE HELPER PLANE
    plane = new CSS3D.Mesh( new CSS3D.PlaneGeometry( 2000, 2000, 18, 18), new CSS3D.MeshBasicMaterial() );
    plane.visible = false;
    this.cssScene.add( plane );

    //Dragging functions

    this.canvas.onmousemove = (event) => {
      event.preventDefault()

      var boundingRect = this.canvas.getBoundingClientRect();
      var x = (event.clientX - boundingRect.left)
      var y = (event.clientY - boundingRect.top)

      var mouse_x = ( (x / this.canvasArea.width) * 2 - 1);
      var mouse_y = - ( y / this.canvasArea.height) * 2 + 1;

      // console.log("clientX: ", event.clientX)
      // console.log("canvas", this.canvasArea.width)
      // console.log("mouse_x", mouse_x)

      var vector = new CSS3D.Vector3( mouse_x, mouse_y, 0.5)
      projector.unprojectVector( vector, this.camera)

      var raycaster = new CSS3D.Raycaster( this.camera.position, vector.sub( this.camera.position ).normalize() );

      if(selectedObject) {
        var intersects = raycaster.intersectObject(plane);
        if(intersects[0]){
          selectedObject.position.copy(intersects[0].point.sub( offset ) )
        }
      } else if (this.emailsArray) {
        intersects = raycaster.intersectObjects(this.emailsArray, true)
        if ( intersects.length > 0 ) {
          plane.position.copy( intersects[0].object.position);
          plane.lookAt( this.camera.position );
        }
      }
    }

    this.canvas.onmousedown = (event) => {
      event.preventDefault()

      var boundingRect = this.canvas.getBoundingClientRect();

      console.log("CANVAS: ", boundingRect)

      var x = (event.clientX - boundingRect.left)
      var y = (event.clientY - boundingRect.top)

      var mouse_x = ( (x / this.canvasArea.width) * 2 - 1);
      var mouse_y = - ( y / this.canvasArea.height) * 2 + 1;


      var vector = new CSS3D.Vector3(mouse_x, mouse_y, 0.5);
      projector.unprojectVector(vector, this.camera);
      var raycaster = new CSS3D.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());
      var intersects = raycaster.intersectObjects(this.emailsArray)

      if (intersects.length > 0) {
        this.controls.enabled = false;
        selectedObject = intersects[0].object;

        intersects = raycaster.intersectObject(plane);
        offset.copy(intersects[0].point).sub(plane.position)
      }
    }

    this.canvas.onmouseup = (event) => {
      event.preventDefault()
      this.controls.enabled = true;
      selectedObject = null;
    }
    const controls = new TrackballControls(this.camera, this.canvas);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    this.controls = controls;

    //WEBGLRENDERER
    this.renderer = new CSS3D.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(0xffffff, 1)
    this.renderer.setSize(this.canvasArea.width, this.canvasArea.height);
    this.renderer.domElement.style.position = 'absolute';//not supposed to be here
    this.renderer.domElement.style.top = 0;//not supposed to be here
    this.renderer.domElement.style.right = 0; //mabye
    this.renderer.domElement.style.zIndex = 1;
    this.canvas.appendChild(this.renderer.domElement);

console.log("renderer: ", this.renderer.domElement)

    //CSSRENDERER
    this.renderer2 = new CSS3D.CSS3DRenderer();
    this.renderer2.setSize(this.canvasArea.width, this.canvasArea.height);
    this.renderer2.domElement.style.position = 'absolute';
    this.renderer2.domElement.style.top = 0;
    this.renderer.domElement.style.right = 0; //mabye
    this.renderer2.domElement.style.zIndex = 5;
    this.canvas.appendChild(this.renderer2.domElement);

    console.log("renderer2: ", this.renderer2.domElement)


    //Render Children
    this.props.emails.forEach((email, idx) => {
      let emailProps = {...email}
      if(this.props.readEmails.includes(email.id)){
        emailProps.read = true
      }
      emailCardTwo(emailProps, this.cssScene, this.glScene, this.addToArray.bind(this))
    })

    //start animation
    function renderScene() {
      this.controls.update()
      this.renderer.render(this.glScene, this.camera)
      this.renderer2.render(this.cssScene, this.camera)
      requestAnimationFrame(renderScene.bind(this))
    }
    requestAnimationFrame(renderScene.bind(this))

  }

  addToArray = (obj) => {
    this.emailsArray.push(obj)
  }

  render() {
    return(
      <div>
      </div>
    )
  }

}


export default EmailList
