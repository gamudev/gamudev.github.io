// Cache de elementos DOM para mejor rendimiento
const $containerApps = $(".containerApps > div");
const $iframeModal = $("#iframe-modal");
const modalRoutes = {
    'buscaminas': "Demo/Buscaminas/buscaminas.html",
    'calculadora': "Demo/Calculadora/calculadora.html",
    'parejas': "Demo/Encuentra Pareja Fruta/encuentraParejaFruta.html",
    'snake': "Demo/Snake/snake.html",
    'tresenraya': "Demo/Tres En Raya/tresEnRaya.html",
    'tetris': "Demo/Tetris/tetris.html"
};

$(document).ready(function () {
    // Función para sanitizar y validar rutas
    function sanitizeRoute(route) {
        // Solo permitir rutas relativas que empiecen con "Demo/"
        if (typeof route !== 'string') return null;
        if (!route.startsWith('Demo/')) return null;
        // Remover caracteres peligrosos
        return route.replace(/[<>\"'%]/g, '');
    }

    // Usar delegación de eventos para mejor rendimiento
    $containerApps.on('click', function () {
        const id = $(this).attr("id");
        // Validar que el ID existe en las rutas permitidas
        if (!id || !modalRoutes.hasOwnProperty(id)) {
            console.warn('ID de proyecto no válido:', id);
            return;
        }
        const route = modalRoutes[id];
        const sanitizedRoute = sanitizeRoute(route);
        if (sanitizedRoute) {
            $iframeModal.attr("src", sanitizedRoute);
            openModal();
        }
    });

    const modal = document.getElementById("modalApp");
    const span = document.getElementById("closeModal");
    let previousActiveElement = null;

    function openModal() {
        previousActiveElement = document.activeElement;
        modal.style.display = "block";
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add('modal-open'); // Deshabilita el scroll
        span.focus(); // Enfocar el botón de cerrar para accesibilidad
    }

    function closeModal() {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove('modal-open'); // Habilita el scroll
        $iframeModal.attr("src", ""); // Limpiar el src del iframe para liberar recursos
        if (previousActiveElement) {
            previousActiveElement.focus(); // Devolver foco al elemento anterior
        }
    }

    span.onclick = closeModal;
    
    // Soporte para teclado en botón cerrar
    span.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            closeModal();
        }
    });

    window.onclick = function (event) {
        if (event.target == modal) {
            closeModal();
        }
    }
    
    // Cerrar modal con Escape
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal.style.display === "block") {
            closeModal();
        }
    });
});

// Mejorar accesibilidad de tabs del resume
$(".resume-icon > ul > li").on("click keydown", function (e) {
    if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") {
        return;
    }
    if (e.type === "keydown") {
        e.preventDefault();
    }
    
    $(".resume-icon > ul > li").attr("class", "").attr("aria-selected", "false");
    $(this).attr("class", "active").attr("aria-selected", "true");
    $(".resume-content > div").attr("style", "display: none").attr("aria-hidden", "true");
    const targetId = $(this).attr("data");
    $("#" + targetId).attr("style", "").attr("aria-hidden", "false");
});

// Navegación por teclado en tabs
$(".resume-icon > ul > li").on("keydown", function (e) {
    const tabs = $(".resume-icon > ul > li");
    const currentIndex = tabs.index(this);
    let nextIndex;
    
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % tabs.length;
        tabs.eq(nextIndex).focus().trigger("click");
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        tabs.eq(nextIndex).focus().trigger("click");
    } else if (e.key === "Home") {
        e.preventDefault();
        tabs.first().focus().trigger("click");
    } else if (e.key === "End") {
        e.preventDefault();
        tabs.last().focus().trigger("click");
    }
});


const wrapper = document.querySelectorAll(".cardWrap");

wrapper.forEach(element => {    
    let state = {
        mouseX: 0,
        mouseY: 0,
        height: element.clientHeight,
        width: element.clientWidth
    };

    element.addEventListener("mousemove", component => {
        const card = element.querySelector(".card");
        const cardBg = card.querySelector(".cardBg");
        state.mouseX = component.pageX - element.offsetLeft - state.width / 2;
        state.mouseY = component.pageY - element.offsetTop - state.height / 2;

        // Reducir ángulos para evitar rotaciones excesivas
        const angleX = Math.max(-12, Math.min(12, (state.mouseX / state.width) * 15));
        const angleY = Math.max(-12, Math.min(12, (state.mouseY / state.height) * -15));
        card.style.transform = `rotateY(${angleX}deg) rotateX(${angleY}deg) `;

        // Reducir movimiento del fondo
        const posX = Math.max(-20, Math.min(20, (state.mouseX / state.width) * -20));
        const posY = Math.max(-20, Math.min(20, (state.mouseY / state.height) * -20));
        cardBg.style.transform = `translateX(${posX}px) translateY(${posY}px)`;
    });

    element.addEventListener("mouseout", () => {
        const card = element.querySelector(".card");
        const cardBg = card.querySelector(".cardBg");
        card.style.transform = `rotateY(0deg) rotateX(0deg) `;
        cardBg.style.transform = `translateX(0px) translateY(0px)`;
    });
    
    // Soporte para teclado en cards
    element.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            element.click();
        }
    });
});
   
document.addEventListener("DOMContentLoaded", function () {
    const themeToggleButton = document.getElementById("theme-toggle");
    const soundToggleButton = document.getElementById("sound-toggle");

    // Función para aplicar tema
    function applyTheme(isDark) {
        if (isDark) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
        updateThemeIcon(isDark);
        themeToggleButton.setAttribute("aria-pressed", isDark);
        // Guardar preferencia
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    // Función para actualizar icono del tema
    function updateThemeIcon(isDark) {
        const icon = themeToggleButton.querySelector("i");
        if (isDark) {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        } else {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        }
    }

    // Detectar preferencia del sistema
    function getSystemPreference() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // Cargar tema guardado o usar preferencia del sistema
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        let isDark;
        
        if (savedTheme) {
            isDark = savedTheme === 'dark';
        } else {
            // Si no hay preferencia guardada, usar la del sistema
            isDark = getSystemPreference();
        }
        
        applyTheme(isDark);
    }

    // Escuchar cambios en la preferencia del sistema
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            // Solo aplicar si no hay preferencia guardada
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches);
            }
        });
    }

    // Cargar tema al iniciar
    loadTheme();

    // Toggle dark/light mode
    themeToggleButton.addEventListener("click", function () {
        const isDark = document.body.classList.contains("dark-mode");
        applyTheme(!isDark);
    });
    
    // Soporte para teclado en toggle de tema
    themeToggleButton.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            themeToggleButton.click();
        }
    });

    // Toggle sound on/off
    soundToggleButton.addEventListener("click", function () {
        const icon = soundToggleButton.querySelector("i");
        const isMuted = icon.classList.contains("fa-volume-up");
        soundToggleButton.setAttribute("aria-pressed", isMuted ? "true" : "false");
        if (isMuted) {
            icon.classList.remove("fa-volume-up");
            icon.classList.add("fa-volume-mute");
            // Aquí puedes agregar la lógica para desactivar el sonido
        } else {
            icon.classList.remove("fa-volume-mute");
            icon.classList.add("fa-volume-up");
            // Aquí puedes agregar la lógica para activar el sonido
        }
    });
    
    // Soporte para teclado en toggle de sonido
    soundToggleButton.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            soundToggleButton.click();
        }
    });
});

const texts = ["SOFTWARE ENGINEER", "FRONTEND DEVELOPER", "BACKEND DEVELOPER"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenTexts = 1000;
const delayAfterDeleting = 500;

function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.getElementById('typing-text').textContent = letter;
    if (letter.length === currentText.length) {
        setTimeout(deleteText, delayBetweenTexts); // Delay before starting to delete
    } else {
        setTimeout(type, typingSpeed); // Speed of typing
    }
}

function deleteText() {
    letter = currentText.slice(0, --index);
    document.getElementById('typing-text').textContent = letter;

    if (letter.length === 0) {
        count++;
        setTimeout(type, delayAfterDeleting); // Start typing next text after deleting
    } else {
        setTimeout(deleteText, deletingSpeed); // Speed of deleting
    }
}

// Start the typing animation
type();


document.addEventListener('DOMContentLoaded', () => {
    const collapsibles = document.querySelectorAll('.collapsible');

    collapsibles.forEach(collapsible => {
        const header = collapsible.querySelector('.collapsible-header');
        const body = collapsible.querySelector('.collapsible-body');
        
        if (header) {
            header.addEventListener('click', () => {
                const isActive = collapsible.classList.toggle('active');
                header.setAttribute('aria-expanded', isActive);
                if (isActive) {
                    body.style.display = 'flex'; // Cambiar a 'flex' para mantener el diseño CSS
                } else {
                    body.style.display = 'none';
                }
            });
            
            // Soporte para teclado
            header.addEventListener('keydown', (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    header.click();
                }
            });
        }
    });
});
