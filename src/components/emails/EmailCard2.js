import React, { Component } from 'react';
import CSS3D from 'css3d';
import OrbitControls from 'three-orbitcontrols'
import { randomColor } from 'randomcolor'
// import '../../App.css';
import EmailCard from './EmailCard.js'

export function emailCardTwo(props, scene) {

    //HTML TO APPEND
    let element = document.createElement('div');
    let button = document.createElement('BUTTON');
    button.innerHTML= "See details"
    // console.log("in card", props)
    element.innerHTML = `
    <h3>From: ${props.user.name}</h3>
    <p>Email: ${props.user.email_address}</p>
    <p>Subject: ${props.subject}</p>
    <hr>
    `
    element.appendChild(button)
    element.className = "three-div"

    let colors = randomColor();
    element.style.cssText = `
        background: ${colors};
        color: #E60000;
        fontFamily: Arial, Helvetica, Sans-serif;
        fontSize: 2em;
        padding: 2em;
      `

    button.addEventListener("click", ()=> {
      console.log("oink oink")
      element.innerHTML += `<p> ${props.content} </p>`
    })

    let div = new CSS3D.CSS3DObject(element);

    div.position.set(
          Math.random() * 1000 - 500,
          Math.random() * 600 - 300,
          Math.random() * 800 - 400)

    scene.add(div);
  }

  //   //CSSRENDERER
  //   renderer2 = new CSS3D.CSS3DRenderer();
  //   renderer2.setSize(window.innerWidth, window.innerHeight);
  //   renderer2.domElement.style.position = 'absolute';
  //   renderer2.domElement.style.top = 0;
  //   console.log("IPOANDOINAOIDNAOIDNAOIDN");
  //   document.body.appendChild(renderer2.domElement);
  // }
  // var renderer = new CSS3D.WebGLRenderer({ antialias: true });
  // renderer.setClearColor(0xffffff, 1)
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.domElement.style.zIndex = 5;
  // document.body.appendChild(renderer.domElement);

  //SCENE
  // var scene = new CSS3D.Scene();

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


  //RENDER LOOP
  // renderScene = () => {
  //   renderer2.render(cssScene, camera)
  //   requestAnimationFrame(renderScene)
  // }

  // renderer.render(scene, camera);
//   render() {
//     console.log("in emailcard2", this.div)
//     return(
//       <div>
//       HELLO
//       </div>
//     )
//   }
//
// }
//
// export default EmailCardTwo
// // requestAnimationFrame(this.renderScene) from return
