$(".containerApps > div").click(function(){
    const id = $(this).attr("id");
    console.log(id)
    switch(id){
        case 'buscaminas': 
            $("#iframe-modal").attr("src","Demo/Buscaminas/buscaminas.html");
            break;
        case 'calculadora':
            $("#iframe-modal").attr("src", "Demo/Calculadora/calculadora.html");
            break;
        case 'parejas':
            $("#iframe-modal").attr("src", "Demo/Encuentra Pareja Fruta/encuentraParejaFruta.html");
            break;
        case 'snake': 
            $("#iframe-modal").attr("src", "Demo/Snake/snake.html");
            break;
        case 'tresenraya':
            $("#iframe-modal").attr("src", "Demo/Tres En Raya/tresEnRaya.html");
            break;
        case 'tetris':
            $("#iframe-modal").attr("src", "Demo/Tetris/tetris.html");
            break;
    }
});

$(".resume-icon > ul > li").click(function () {
    $(".resume-icon > ul > li").attr("class", "");
    $(this).attr("class", "active");
    $(".resume-content > div").attr("style","display: none")
    $("#" + $(this).attr("data")).attr("style", "");

});


const wrapper = document.querySelectorAll(".cardWrap");

wrapper.forEach(element => {    
    let state = {
        mouseX: 0,
        mouseY: 0,
        height: element.clientHeight,
        width: element.clientWidth
    };

    element.addEventListener("mousemove", ele => {
        const card = element.querySelector(".card");
        const cardBg = card.querySelector(".cardBg");
        state.mouseX = ele.pageX - element.offsetLeft - state.width / 2;
        state.mouseY = ele.pageY - element.offsetTop - state.height / 2;

        // angle in card
        const angleX = (state.mouseX / state.width) * 30;
        const angleY = (state.mouseY / state.height) * -30;
        card.style.transform = `rotateY(${angleX}deg) rotateX(${angleY}deg) `;

        // position of background in card
        const posX = (state.mouseX / state.width) * -40;
        const posY = (state.mouseY / state.height) * -40;
        cardBg.style.transform = `translateX(${posX}px) translateY(${posY}px)`;
    });

    element.addEventListener("mouseout", () => {
        const card = element.querySelector(".card");
        const cardBg = card.querySelector(".cardBg");
        card.style.transform = `rotateY(0deg) rotateX(0deg) `;
        cardBg.style.transform = `translateX(0px) translateY(0px)`;
    });
});