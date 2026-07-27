import * as THREE from "three";

const container = document.getElementById("container");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
45,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.set(0,2,8);

const renderer = new THREE.WebGLRenderer({
antialias:true
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(
window.innerWidth,
window.innerHeight
);

container.appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(0xffffff,1.3);
scene.add(ambient);

const light = new THREE.PointLight(0xbb66ff,40);
light.position.set(10,10,10);
scene.add(light);

const geometry = new THREE.SphereGeometry(1.25,128,128);

const material = new THREE.MeshPhysicalMaterial({

color:0x050505,

metalness:0.9,

roughness:0.2,

clearcoat:1,

clearcoatRoughness:0,

emissive:0x220044,

emissiveIntensity:0.45

});

const planet = new THREE.Mesh(
geometry,
material
);

scene.add(planet);

const ringGeometry = new THREE.TorusGeometry(
1.9,
0.05,
32,
250
);

const ringMaterial = new THREE.MeshBasicMaterial({

color:0xbb66ff

});

const ring = new THREE.Mesh(
ringGeometry,
ringMaterial
);

ring.rotation.x=Math.PI/2.5;

scene.add(ring);

const starsGeometry=new THREE.BufferGeometry();

const starVertices=[];

for(let i=0;i<7000;i++){

starVertices.push(

(Math.random()-0.5)*250,

(Math.random()-0.5)*250,

(Math.random()-0.5)*250

);

}

starsGeometry.setAttribute(

"position",

new THREE.Float32BufferAttribute(
starVertices,
3
)

);

const starsMaterial=new THREE.PointsMaterial({

color:0xffffff,

size:0.22

});

const stars=new THREE.Points(

starsGeometry,

starsMaterial

);

scene.add(stars);

function animate(){

requestAnimationFrame(animate);

planet.rotation.y+=0.003;

planet.rotation.x+=0.0008;

ring.rotation.z+=0.002;

stars.rotation.y+=0.00015;

camera.position.x=Math.sin(Date.now()*0.00015)*0.45;

camera.lookAt(0,0,0);

renderer.render(scene,camera);

}

animate();

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(

window.innerWidth,

window.innerHeight

);

});
