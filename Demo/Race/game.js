const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Tamaño del canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Cargar imágenes
const backgroundImg = new Image();
backgroundImg.src = './img/background.jpg'; // Cambiado a background.jpg

const carImg = new Image();
carImg.src = './img/car.png';

const obstacle1Img = new Image();
obstacle1Img.src = './img/obstacle1.png';

const obstacle2Img = new Image();
obstacle2Img.src = './img/obstacle2.png';

const explosionImg = new Image();
explosionImg.src = './img/explosion.png';

// Variables de juego
let playerX = canvas.width / 2 - 50; // Posición inicial del jugador en X
let playerY = canvas.height - 150; // Posición inicial del jugador en Y
let gravity = 1; // Gravedad para la caída del jugador
let jumpPower = -15; // Fuerza del salto
let playerIsJumping = false; // Estado de salto del jugador
let gameSpeed = 5; // Velocidad del juego
let obstacles = []; // Array de obstáculos
let score = 0; // Puntuación del jugador
let gameover = false; // Estado de juego (Game Over)

// Eventos de teclado
document.addEventListener('keydown', function (event) {
    if (event.code === 'Space' && !playerIsJumping) {
        playerIsJumping = true;
    }
});

// Función para dibujar el fondo
function drawBackground() {
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
}

// Función para dibujar al jugador
function drawPlayer() {
    ctx.drawImage(carImg, playerX, playerY, 100, 50);
}

// Función para dibujar obstáculos
function drawObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        let ob = obstacles[i];
        if (ob.type === 1) {
            ctx.drawImage(obstacle1Img, ob.x, ob.y, ob.width, ob.height);
        } else if (ob.type === 2) {
            ctx.drawImage(obstacle2Img, ob.x, ob.y, ob.width, ob.height);
        }
    }
}

// Función principal del juego
function updateGame() {
    if (!gameover) {
        // Limpiar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibujar fondo
        drawBackground();

        // Dibujar jugador
        drawPlayer();

        // Aplicar gravedad al jugador si no está saltando
        if (!playerIsJumping) {
            playerY += gravity;
        }

        // Aplicar salto al jugador
        if (playerIsJumping) {
            playerY += jumpPower;
            jumpPower += 1;
            if (playerY >= canvas.height - 150) {
                playerY = canvas.height - 150;
                playerIsJumping = false;
                jumpPower = -15;
            }
        }

        // Generar obstáculos aleatoriamente
        if (Math.random() < 0.02) {
            let obstacleType = Math.random() < 0.5 ? 1 : 2; // 1: obstáculo nivel suelo, 2: obstáculo nivel superior
            let obstacleImg, obstacleHeight, obstacleY;
            if (obstacleType === 1) {
                obstacleImg = obstacle1Img;
                obstacleHeight = 50;
                obstacleY = canvas.height - 150;
            } else {
                obstacleImg = obstacle2Img;
                obstacleHeight = 100;
                obstacleY = canvas.height - 250;
            }
            obstacles.push({
                x: canvas.width + 50,
                y: obstacleY,
                width: 50,
                height: obstacleHeight,
                type: obstacleType
            });
        }

        // Mover y dibujar obstáculos
        for (let i = 0; i < obstacles.length; i++) {
            let ob = obstacles[i];
            ob.x -= gameSpeed;
            ctx.drawImage(ob.type === 1 ? obstacle1Img : obstacle2Img, ob.x, ob.y, ob.width, ob.height);

            // Colisión con obstáculos
            if (playerX < ob.x + ob.width &&
                playerX + 100 > ob.x &&
                playerY < ob.y + ob.height &&
                playerY + 50 > ob.y) {
                gameover = true;
            }

            // Eliminar obstáculos fuera de la pantalla y aumentar puntuación
            if (ob.x + ob.width < 0) {
                obstacles.splice(i, 1);
                score++;
            }
        }

        // Mostrar puntuación
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, 10, 30);

        // Mostrar "Game Over" y permitir reiniciar
        if (gameover) {
            ctx.drawImage(explosionImg, playerX, playerY, 100, 50);
            ctx.fillStyle = 'red';
            ctx.font = '40px Arial';
            ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
            ctx.font = '20px Arial';
            ctx.fillText('Press Space to Restart', canvas.width / 2 - 120, canvas.height / 2 + 50);
        } else {
            requestAnimationFrame(updateGame);
        }
    }
}

// Iniciar el juego por primera vez
updateGame();
