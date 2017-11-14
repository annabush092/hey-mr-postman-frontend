import React from 'react'
import CSS3D from 'css3d';
// import OrbitControls from 'three-orbitcontrols'
import EmailCard from './EmailCard.js'
import {emailCardTwo} from './EmailCard2.js'
import ReactDOM from 'react-dom';
import TrackballControls from '../../ref/trackball';


class EmailList extends React.Component {

  componentDidMount() {


    //CSS3D SCENE
    this.cssScene = new CSS3D.Scene();

    //WEBGL SCENE
    this.glScene = new CSS3D.Scene();

    //CAMERA
    this.camera = new CSS3D.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.set(0, 0, 500)
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

    document.onmousemove = (event) => {

      var mouse_x = ( event.clientX / window.innerWidth ) * 2 - 1;
      var mouse_y = - ( event.clientY / window.innerHeight) * 2 + 1;

      var vector = new CSS3D.Vector3( mouse_x, mouse_y, 0.5)
      projector.unprojectVector( vector, this.camera)

      var raycaster = new CSS3D.Raycaster( this.camera.position, vector.sub( this.camera.position ).normalize() );

      if(selectedObject) {
        var intersects = this.raycaster.intersectObject ( plane );
        selectedObject.position.copy(intersects[ 0 ].point.sub( offset ) );
      } else if (this.emailsArray) {
        var intersects = raycaster.intersectObjects(this.emailsArray, true)
        console.log(intersects)
        if ( intersects.length > 0 ) {
          plane.position.copy( intersects[0].object.position);
          plane.lookAt( this.camera.position );
        }
      }
    }

    // document.onmousedown = (event) => {
    //   var mouse_x = (event.clientX / window.innerWidth) * 2 - 1;
    //   var mouse_y = - (event.clientY / window.innerHeight) * 2 + 1;
    //   var vector = new CSS3D.
    // }

    const controls = new TrackballControls(this.camera);

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
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.domElement.style.position = 'absolute';//not supposed to be here
    // this.renderer.domElement.style.top = 0;//not supposed to be here
    this.renderer.domElement.style.zIndex = 5;
    document.body.appendChild(this.renderer.domElement);

    //CSSRENDERER
    this.renderer2 = new CSS3D.CSS3DRenderer();
    this.renderer2.setSize(window.innerWidth, window.innerHeight);
    this.renderer2.domElement.style.position = 'absolute';
    this.renderer2.domElement.style.top = 0;
    document.body.appendChild(this.renderer2.domElement);

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
