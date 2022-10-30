$(".apps > a").click(function(){
    console.log($(this))
    const id = $(this).attr("id");
    console.log(id)
    switch(id){
        case 'buscaminas': 
            $("#iframe-modal").attr("src","demo/Buscaminas/buscaminas.html");
            break;
        case 'calculadora':
            $("#iframe-modal").attr("src", "Demo/Calculadora/calculadora.html");
            break;
        case 'parejas':
            $("#iframe-modal").attr("src", "Demo/Encuentra Pareja Fruta/encuentraParejaFruta.html");
            break;
        case 'patron': 
            $("#iframe-modal").attr("src", "Demo/Patron desbloqueo/patronDesbloqueo.html");
            break;
        case 'tresenraya':
            $("#iframe-modal").attr("src", "Demo/Tres En Raya/tresEnRaya.html");
            break;
        case 'reloj':
            $("#iframe-modal").attr("src", "Demo/Reloj digital/relojDigital.html");
            break;
    }

    

    // var myModal = document.getElementById('myModal')
    // var myInput = document.getElementById('myInput')

    // myModal.addEventListener('shown.bs.modal', function () {
    //     myInput.focus()
    // })

});


