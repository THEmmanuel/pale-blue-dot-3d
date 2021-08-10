import './style.css'
import * as THREE from 'three'
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//Loading
const textureLoader = new THREE.TextureLoader()
const earthNormalTexture = textureLoader.load('textures/EarthNormalMap.png');

// Debug
const gui = new dat.GUI()
// const light1 

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const sphereGeometry = new THREE.SphereBufferGeometry(.5, 64, 64)

// Materials
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.6;
material.roughness = 0.5;
material.normalMap = earthNormalTexture
material.color = new THREE.Color(0x046694)

// Mesh
const sphere = new THREE.Mesh(sphereGeometry, material)
scene.add(sphere)

// Lights
// Point Light 1
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

//Point Light 2
const light1 = gui.addFolder('light 1')
const pointLight2 = new THREE.PointLight(0xff0000, 2);
// pointLight2.position.set(x, y, z)
pointLight2.position.set(-3, -3, -3)
pointLight2.intensity = 10
scene.add(pointLight2)
light1.add(pointLight2.position, 'x').min(-3).max(3).step(0.01)
light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
light1.add(pointLight2, 'intensity').min(0).max(10)

//Point Light 3
const light2 = gui.addFolder('light 2')
const pointLight3 = new THREE.PointLight(0x0074B2, 2);
pointLight3.position.set(3, 3, -3)
pointLight3.intensity = 10
scene.add(pointLight3)
light2.add(pointLight3.position, 'x').min(-3).max(3).step(0.01)
light2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
light2.add(pointLight3, 'intensity').min(0).max(10)

const pointLightHelper = new THREE.PointLightHelper(pointLight2, 0.3);
const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 0.3);

// scene.add(pointLightHelper);
// scene.add(pointLightHelper2);

const Light2Color = {
    color: 0x0074B2
};

light2.addColor(Light2Color, 'color').onChange(() => {
    pointLight3.color.set(Light2Color.color)
})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)
let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const wiindowX = window.innerWidth / 2;
const wiindowY = window.innerHeight / 2

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - wiindowX)
    mouseX = (event.clientY - wiindowY)
}

const updateSphere = event => {
    sphere.position.y = window.scrollY * 0.001
}

window.addEventListener('scroll', updateSphere)

const clock = new THREE.Clock()

const tick = () => {
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
    sphere.rotation.x += 0.5 * (targetY - sphere.rotation.x);
    sphere.position.z += 0.5 * (targetY - sphere.rotation.x)
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick();