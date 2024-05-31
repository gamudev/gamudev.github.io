document.querySelector("#contador").innerHTML = Number(getCookie("contador")) || 0;

const boton = document.querySelector("#boton");
boton.addEventListener(
    "click",
    () => incremento(),
    false,
);

function incremento(){
    const contador = Number(getCookie("contador")) || 0;
    document.querySelector("#contador").innerHTML = contador + 1;
    setCookie("contador", contador + 1, 7);
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}