$(".apps > a").click(function(){
    console.log($(this))
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

$("#anteriorApp").click(function(){
    let id = $(".apps[style='display:block']").attr("id");
    $("#" + id).attr("style","display: none");
    let newPos = Number(id.slice(3));
    if (newPos == 0){
        $("#app5").attr("style","display:block");
    } else {
        $("#" + id.substring(0, 3) + (newPos - 1)).attr("style", "display:block");
    }
})

$("#siguienteApp").click(function () {
    let id = $(".apps[style='display:block']").attr("id");
    $("#" + id).attr("style", "display: none");
    let newPos = Number(id.slice(3));
    if (newPos == 5) {
        $("#app0").attr("style", "display:block");
    } else {
        $("#" + id.substring(0, 3) + (newPos + 1)).attr("style", "display:block");
    }
})