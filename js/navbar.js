$('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});
let emailInput = $('#floatingEmail')
let nameInput = $('#floatingName')
$('#buttonConfirm').on('click', (e) => {
    e.preventDefault();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Gracias por su compra ${nameInput.val()}`,
        text: `Le hemos enviado un Email a ${emailInput.val()} con los pasos a seguir`,
        showConfirmButton: false,
        timer: 3500,
        footer: 'CorralonLarralde - Todos los derechos reservados ©'
      })
    carrito = {}
})