const container = document.getElementById("container");
const gallery = document.getElementById("gallery");
const music = document.getElementById("music");
const loading = document.getElementById("loading");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 120;

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);
const controls = new THREE.OrbitControls(camera, renderer.domElement);

controls.enableZoom = true;
controls.enableRotate = true;
controls.enablePan = false;

controls.minDistance = 15;
controls.maxDistance = 250;

controls.enableDamping = true;
controls.dampingFactor = 0.05;

const light = new THREE.PointLight(0xffffff, 2);
light.position.set(50, 50, 100);
scene.add(light);

const ambient = new THREE.AmbientLight(0xff6699, 2);
scene.add(ambient);

const group = new THREE.Group();
scene.add(group);

const loader = new THREE.FontLoader();

let clicked = false;

loader.load(
    "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
    function(font){

        const material = new THREE.MeshPhongMaterial({
            color:0xff4f8b
        });

        for(let i=0;i<350;i++){

            const geometry = new THREE.TextGeometry(
                "I LOVE YOU ALAA",
                {
                    font:font,
                    size:1.3,
                    height:.3
                }
            );

            const mesh = new THREE.Mesh(
                geometry,
                material
            );

            const t = Math.PI*2*(i/350);

            const x = 16*Math.pow(Math.sin(t),3);

            const y = 13*Math.cos(t)
                    -5*Math.cos(2*t)
                    -2*Math.cos(3*t)
                    -Math.cos(4*t);

            mesh.position.set(
                x*3,
                y*3,
                (Math.random()-.5)*35
            );

            group.add(mesh);

        }

        loading.style.display="none";

    }
);function animate() {

    requestAnimationFrame(animate);

    if (!clicked) {
        group.rotation.y += 0.005;
        group.rotation.x = Math.sin(Date.now() * 0.001) * 0.2;
    }

    renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});

renderer.domElement.addEventListener("click", () => {

    if (clicked) return;

    clicked = true;

    music.play();

    zoomInside();

});

function zoomInside() {

    let z = camera.position.z;

    function step() {

        z -= 2;

        camera.position.z = z;
controls.update();
        renderer.render(scene, camera);

        if (z > 15) {

            requestAnimationFrame(step);

        } else {

            showGallery();

        }

    }

    step();

}

function showGallery() {

    container.style.display = "none";

    gallery.style.display = "flex";

    gallery.classList.add("fadeIn");

}function createHeart(x,y){

    const heart=document.createElement("div");

    heart.className="heart";

    heart.innerHTML="❤️<br><span style='font-size:12px'>ALAA</span>";

    heart.style.left=x+"px";

    heart.style.top=y+"px";

    document.body.appendChild(heart);

    setTimeout(()=>{
        heart.remove();
    },2000);

}

document.querySelectorAll(".photo").forEach(img=>{

    img.addEventListener("mousemove",e=>{

        createHeart(e.clientX,e.clientY);

    });

    img.addEventListener("touchmove",e=>{

        const t=e.touches[0];

        createHeart(t.clientX,t.clientY);

    });

});function explodeHearts(x,y){

for(let i=0;i<50;i++){

const h=document.createElement("div");

h.className="boomHeart";

h.innerHTML="❤️<br><span style='font-size:11px'>ALAA</span>";

h.style.left=x+"px";

h.style.top=y+"px";

const angle=Math.random()*Math.PI*2;

const distance=120+Math.random()*250;

const dx=Math.cos(angle)*distance+"px";

const dy=Math.sin(angle)*distance+"px";

h.style.setProperty("--x",dx);

h.style.setProperty("--y",dy);

document.body.appendChild(h);

setTimeout(()=>{

h.remove();

},2500);

}

}