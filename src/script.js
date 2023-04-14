   // Inicializar la validación del formulario con Validate.js
   $(document).ready(function () {
    $('#myForm').validate({ //usamos la funciona validate de validate.js
        // Aqui llamamos a los campos de las ID y verificamos si se agrego algun elemento
        rules: {
            nombre: {
                required: true,
                minlength: 2,
                maxlength: 50
            },
            email: {
                required: true,
                email: true
            },
            comentario: {
                required: true,
                minlength: 2,
                maxlength: 200
            }
        },
        // Si validate verifica que no se ingreso datos en los campos, genera estos mensajes de error
        messages: {
            nombre: {
                required: 'Por favor ingrese un nombre.',
                nombre: "El minimo es 2 y el maximo 50 caracteres."
            },
            email: {
                required: 'Por favor ingrese un email.',
                email: 'Por favor ingrese un email válido.'
            },
            comentario: {
                required: 'Por favor ingrese un comentario.',
                comentario: "El maximo de caracteres es 200."
            }
        },
        //errorElement es un elemento de jQuery Validation que nos permite crear un elemento del DOM donde queremos mostrar el msj
        errorElement: 'div',
        //errorPlacement es una función que nos permite decidir donde situar los mensajes de error generados.
        errorPlacement: function (error, element) { //"error" seria la etiqueta div creada y el "elemento" seria la etiqueta input donde se ejecuto el error
            error.addClass('invalid-feedback'); //agregamos a la etiqueta div la clase invalid-feedback de boostrap
            element.closest('.form-group').append(error); //closest() sirve para seleccionar un padre de un elemento que coincida con el selector dado.Y luego le agregamos la etiqueta div
        },
        //higlight y unhiglight determinan como resaltar los elementos que no han superado la validación.
        highlight: function (element, errorClass, validClass) {// "elemento" es la etiqueta del campo, "errorClass" es -error- y validClass es -valid-
            $(element).addClass('is-invalid').removeClass('is-valid'); //Se agrega a la clase de la etiqueta del campo si es valid o no para activar las funciones de boostrap
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid').addClass('is-valid');
        }
        
    });
});