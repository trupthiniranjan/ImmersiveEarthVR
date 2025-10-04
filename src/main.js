const earth = document.querySelector('#earth');
let rotation = 0;

function rotateGlobe() {
    rotation += 0.05; // Adjust speed here
    earth.setAttribute('rotation', {x: 0, y: rotation, z: 0});
    requestAnimationFrame(rotateGlobe);
}

rotateGlobe();