document.querySelector("#contador").innerHTML = Number(sessionStorage.getItem("contador")) || 0;

const boton = document.querySelector("#boton");
boton.addEventListener(
    "click",
    () => incremento(),
    false,
);

function incremento(){
    const contador = Number(sessionStorage.getItem("contador")) || 0;
    document.querySelector("#contador").innerHTML = contador + 1;
    sessionStorage.setItem("contador",contador + 1);
}


