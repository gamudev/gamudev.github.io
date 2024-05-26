document.querySelector("#contador").innerHTML = Number(localStorage.getItem("contador")) || 0;

const boton = document.querySelector("#boton");
boton.addEventListener(
    "click",
    () => incremento(),
    false,
);

function incremento(){
    const contador = Number(localStorage.getItem("contador")) || 0;
    document.querySelector("#contador").innerHTML = contador + 1;
    localStorage.setItem("contador",contador + 1);
}


