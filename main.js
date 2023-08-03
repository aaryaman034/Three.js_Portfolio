import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//setup
const scene = new THREE.Scene();

//Camera for 360 view and frustrum
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

//Add background to the renderer
renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);
camera.position.setX(-3);
//render == draw
renderer.render( scene , camera);

//Torus

//1.Setup an object to make a shape (X,Y.Z)
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

//2.Material is how it looks like
const material = new THREE.MeshStandardMaterial ({color : 0xff6347});

//3.Mesh geometry + material
const torus = new THREE.Mesh( geometry, material);

scene.add(torus)

//Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

//Listen to dom events on mouse nd updates 
//const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24 );
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff});
  const star = new THREE.Mesh( geometry, material );

  const [x, y , z] = Array(3)
  .fill()
  .map(() => THREE.MathUtils.randFloatSpread( 100 ));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

//Loading JPEG Image / Background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


// moon.position.z  = 30;
// moon.position.setX(-10);


// Avatar

const mineTexture = new THREE.TextureLoader().load('myPic.jpg');

const me  = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial( { map: mineTexture })
);

scene.add(me);

//Moon


const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture

  })
);
scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

me.position.z = -5;
me.position.x = 2;


//Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  me.rotation.y += 0.01;
  me.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;



  
}
document.body.onscroll = moveCamera;
moveCamera();


//Game-Loop to recursivly call for renderer method / animation loop

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;


//controls.update();


  renderer.render( scene, camera);
}
animate();





