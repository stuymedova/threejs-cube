import * as THREE from 'three';
import TouchTexture from './TouchTexture';
import { CustomEffect } from './CustomEffect';
import { EffectComposer, RenderPass, EffectPass } from 'postprocessing';

let renderer;
let camera;
let scene;
let geometry;
let material;
let display;
let composer;
let touchTexture;

// renderer
renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.append(renderer.domElement);

// camera
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 75;

// scene
scene = new THREE.Scene();
scene.background = new THREE.Color(0x161624);
geometry = new THREE.BoxGeometry(10, 10, 10);
material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
display = new THREE.Mesh( geometry, material );
display.position.set(0,0,0);
scene.add(display);

// composer
composer = new EffectComposer(renderer);

const renderPass = new RenderPass(scene, camera);
renderPass.renderToScreen = false;
composer.addPass(renderPass);

touchTexture = new TouchTexture();
const customEffect = new CustomEffect({ texture: touchTexture.texture });
const customPass = new EffectPass(camera, customEffect);
customPass.renderToScreen = true;
composer.addPass(customPass);

onMouseMove = onMouseMove.bind(this);
window.addEventListener('mousemove', onMouseMove);

tick();
function tick() {
  display.rotation.x += 0.01;
  display.rotation.y -= 0.01;
  touchTexture.update();
  composer.render();
  requestAnimationFrame(tick);
}

function onMouseMove(ev) {
  const mouse = {
    x: ev.clientX / window.innerWidth,
    y: 1 - ev.clientY / window.innerHeight,
  };
  touchTexture.addTouch(mouse);
}