// ===========================
// PARTE 1 DE 3
// ===========================

// ---------- Lista de palabras ----------

const words = [

"Ale",
"Linda",
"Bonita",
"Hermosa",
"Inteligente",
"Maravillosa",
"Especial",
"Increíble",
"Única",
"Admirable",
"Amable",
"Dulce",
"Brillante",
"Encantadora",
"Sonrisa hermosa",
"Ojos bonitos",
"Genial",
"Alegre",
"Creativa",
"Elegante",
"Fuerte",
"Valiente",
"Auténtica",
"Radiante",
"Carismática",
"Fantástica",
"Encantadora",
"Mi amiga",
"Lo mejor para ti",
"Nunca cambies"

];

// ---------- Elementos ----------

const container = document.getElementById("wordContainer");
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let playing = false;

// ---------- Botón música ----------

musicBtn.addEventListener("click", () => {

    if (!playing) {

        music.play();

        musicBtn.innerHTML = "⏸ Pausar música";

        playing = true;

    } else {

        music.pause();

        musicBtn.innerHTML = "▶ Reproducir música";

        playing = false;

    }

});

// ---------- Crear palabras ----------

const items = [];

const radius = 230;

words.forEach((text, index) => {

    const word = document.createElement("div");

    word.className = "word";

    word.innerText = text;

    container.appendChild(word);

    items.push(word);

});

let angle = 0;

// ---------- Fondo de estrellas ----------

const canvas = document.getElementById("stars");

const ctx = canvas.getContext("2d");

function resizeCanvas(){

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

const stars = [];

for(let i=0;i<220;i++){

    stars.push({

        x:Math.random()*canvas.width,

        y:Math.random()*canvas.height,

        r:Math.random()*2,

        s:Math.random()*0.6+0.2

    });

}
// ===========================
// PARTE 2 DE 3
// ===========================

// ---------- Posicionar palabras en una esfera ----------

function updateWords(){

    angle += 0.0035;

    items.forEach((word,index)=>{

        const phi = Math.acos(-1 + (2 * index) / items.length);

        const theta = Math.sqrt(items.length * Math.PI) * phi + angle;

        const x = radius * Math.cos(theta) * Math.sin(phi);

        const y = radius * Math.sin(theta) * Math.sin(phi);

        const z = radius * Math.cos(phi);

        const scale = (z + 500) / 700;

        word.style.transform =
        `translate3d(${x}px,${y}px,${z}px) scale(${scale})`;

        word.style.opacity = scale;

        word.style.zIndex = Math.floor(scale * 100);

    });

}

// ---------- Dibujar estrellas ----------

function drawStars(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "white";

    stars.forEach(star=>{

        ctx.beginPath();

        ctx.arc(star.x,star.y,star.r,0,Math.PI*2);

        ctx.fill();

        star.y += star.s;

        if(star.y > canvas.height){

            star.y = 0;

            star.x = Math.random()*canvas.width;

        }

    });
  // ===========================
// PARTE 3 DE 3
// ===========================

// ---------- Animación principal ----------

function animate() {

    drawStars();

    updateWords();

    requestAnimationFrame(animate);

}

animate();

// ---------- Movimiento suave con el mouse ----------

document.addEventListener("mousemove", (e) => {

    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * -20;

    container.style.transform =
        `rotateX(${y}deg) rotateY(${x}deg)`;

});

// ---------- Movimiento automático en celular ----------

let auto = 0;

setInterval(() => {

    auto += 0.3;

    container.style.transform =
        `rotateY(${auto}deg) rotateX(${Math.sin(auto/15)*8}deg)`;

}, 30);

// ---------- Reiniciar música cuando termine ----------

music.addEventListener("ended", () => {

    playing = false;

    music.currentTime = 0;

    musicBtn.innerHTML = "▶ Reproducir música";

});

// ---------- Precargar canción ----------

music.load();

console.log("Proyecto para Ale cargado correctamente 🤍");

}
