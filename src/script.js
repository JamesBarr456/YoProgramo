$(document).ready(function () {
  //Esta seccion pertenece al consumo de api

  //Esta seccion pertenece al consumo de api

  var loaded = false;

  //Funcion para cargar 18 pokemones aleatorios en la galeria
  function loadPokemons() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=18")
      .then((response) => response.json())
      .then((data) => {
        var pokemonArray = data.results;
        var randomPokemonArray = shuffleArray(pokemonArray);

        var pokemonList = $("#pokemon-list");
        pokemonList.empty();

        randomPokemonArray.forEach((pokemon) => {
          var pokemonName = pokemon.name;
          var pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            pokemon.url.split("/")[6]
          }.png`;

          pokemonList.append(`
              <div>
                <div class="galeria__pokemon text-center shadow-lg bg-white rounded p-3">
                    <div class="galeria__img-content">
                        <img src="${pokemonImage}" alt="${pokemonName}" class="img-fluid galeria__img"/>
                    </div>
                    <div class="galeria__content">
                        <p class="text-blue-700 fw-bolder text-uppercase">${pokemonName}</p>
                    </div>
                </div>
              </div>
              `);
        });

        loaded = true;
      });
  }

  loadPokemons();

  // funcion para mezclar un array y mostrar mis 6 pokemones randoms

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }

  //Filtro de pokemon por tipos
  $("form").submit(function (event) {
    event.preventDefault();

    var name = $("#pokemon-name").val();
    var type = $("#pokemon-type").val();

    if (name === "" && type !== "") {
      fetch(`https://pokeapi.co/api/v2/type/${type}`)
        .then((response) => response.json())
        .then((data) => {
          var pokemonArray = data.pokemon.map((pokemon) => pokemon.pokemon);
          var randomPokemonArray = shuffleArray(pokemonArray).slice(0, 18);

          var pokemonList = $("#pokemon-list");
          pokemonList.empty();

          randomPokemonArray.forEach((pokemon) => {
            var pokemonName = pokemon.name;
            var pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              pokemon.url.split("/")[6]
            }.png`;

            pokemonList.append(`
            <div>
            <div class="galeria__pokemon text-center shadow-lg bg-white rounded p-3">
                <div class="galeria__img-content">
                    <img src="${pokemonImage}" alt="${pokemonName}" class="img-fluid galeria__img"/>
                </div>
                <div class="galeria__content">
                    <p class="text-blue-700 fw-bolder text-uppercase">${pokemonName}</p>
                </div>
            </div>
          </div>
              `);
          });
        })
        .catch((error) => console.error(error));
    } else {
      // Si no se selecciono un tipo buscar pokemon por nombre
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())
        .then((data) => {
          // filtra segun tipo
          var filteredResults = data.types.filter((result) => {
            if (type === "") {
              return true;
            } else {
              return result.type.name === type;
            }
          });

          var pokemonList = $("#pokemon-list");
          pokemonList.empty();
          //mostrar pokemon por nombre
          for (var i = 0; i < 1 && i < filteredResults.length; i++) {
            var pokemonName = data.name;
            var pokemonImage = data.sprites.front_default;
            pokemonList.append(`
            <div>
            <div class="galeria__pokemon text-center shadow-lg bg-white rounded p-3">
                <div class="galeria__img-content">
                    <img src="${pokemonImage}" alt="${pokemonName}" class="img-fluid galeria__img"/>
                </div>
                <div class="galeria__content">
                    <p class="text-blue-700 fw-bolder text-uppercase">${pokemonName}</p>
                </div>
            </div>
          </div>
              `);
          }
        });
    }
  });

  //Esta seccion corresponde al Validate de Wizard
  $("#formulario").validate({
    rules: {
      nombre: {
        required: true,
        minlength: 2,
        maxlength: 50,
      },
      apellido: {
        required: true,
        minlength: 2,
        maxlength: 50,
      },
      direccion: {
        required: true,
        minlength: 2,
        maxlength: 50,
      },
      correo: {
        required: true,
        email: true,
      },
      telefono: {
        required: true,
        minlength: 2,
        maxlength: 10,
      },
      comentario: {
        required: true,
        minlength: 2,
        maxlength: 200,
      },
    },
    messages: {
      nombre: {
        required: "Por favor ingrese un nombre.",
      },
      apellido: {
        required: "Por favor ingrese un apellido.",
      },
      direccion: {
        required: "Por favor ingrese una direccion.",
      },
      correo: {
        required: "Por favor ingrese un email.",
        email: "Por favor ingrese un email válido.",
      },
      telefono: {
        required: "Por favor ingrese un numero telefonico",
        maxlength: "El maximo es 10",
      },
      comentario: {
        required: "Por favor ingrese un comentario.",
        maxlength: "El maximo de caracteres es 200.",
      },
    },
    errorElement: "div",
    errorPlacement: function (error, element) {
      if (error) error.addClass("invalid-feedback");
      element.closest(".form-group").append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass("is-invalid").removeClass("is-valid");
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass("is-invalid").addClass("is-valid");
    },
  });
  //Esta seccion corresponde al Validate js
  $("#myForm").validate({
    //usamos la funciona validate de validate.js
    // Aqui llamamos a los campos de las ID y verificamos si se agrego algun elemento
    rules: {
      nombre: {
        required: true,
        minlength: 2,
        maxlength: 50,
      },
      email: {
        required: true,
        email: true,
      },
      comentario: {
        required: true,
        minlength: 2,
        maxlength: 200,
      },
    },
    // Si validate verifica que no se ingreso datos en los campos, genera estos mensajes de error
    messages: {
      nombre: {
        required: "Por favor ingrese un nombre.",
        nombre: "El minimo es 2 y el maximo 50 caracteres.",
      },
      email: {
        required: "Por favor ingrese un email.",
        email: "Por favor ingrese un email válido.",
      },
      comentario: {
        required: "Por favor ingrese un comentario.",
        comentario: "El maximo de caracteres es 200.",
      },
    },
    //errorElement es un elemento de jQuery Validation que nos permite crear un elemento del DOM donde queremos mostrar el msj
    errorElement: "div",
    //errorPlacement es una función que nos permite decidir donde situar los mensajes de error generados.
    errorPlacement: function (error, element) {
      //"error" seria la etiqueta div creada y el "elemento" seria la etiqueta input donde se ejecuto el error
      error.addClass("invalid-feedback"); //agregamos a la etiqueta div la clase invalid-feedback de boostrap
      element.closest(".form-group").append(error); //closest() sirve para seleccionar un padre de un elemento que coincida con el selector dado.Y luego le agregamos la etiqueta div
    },
    //higlight y unhiglight determinan como resaltar los elementos que no han superado la validación.
    highlight: function (element, errorClass, validClass) {
      // "elemento" es la etiqueta del campo, "errorClass" es -error- y validClass es -valid-
      $(element).addClass("is-invalid").removeClass("is-valid"); //Se agrega a la clase de la etiqueta del campo si es valid o no para activar las funciones de boostrap
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass("is-invalid").addClass("is-valid");
    },

    submitHandler: function (form) {
      $("#myForm").append(
        "<p class='bg-white py-3 rounded shadow'>Formulario enviado correctamente!</p>"
      );
      $("#btn-contacto").attr("disabled", true);
    },
  });

  //Esta seccion corresponde al form wizard
  $("#paso1").show();
  $(".siguiente").click(function () {
    var currentStep = $(this).closest("div").attr("id");
    var nextStep = parseInt($(this).data("paso"));
    var valid = $("#formulario").valid(); // Validar el formulario

    if (valid) {
      // Si el formulario es válido
      $("#" + currentStep).hide();
      $("#paso" + nextStep).show();
    } //else { // Si el formulario no es válido
    //alert("Por favor complete todos los campos requeridos.");
  });

  // Manejar el click en el botón "Anterior"
  $(".anterior").click(function () {
    var currentStep = $(this).closest("div").attr("id"); // Obtener el ID del paso actual
    var prevStep = parseInt($(this).data("paso")); // Obtener el número de paso anterior
    $("#" + currentStep).hide(); // Ocultar el paso actual
    $("#paso" + prevStep).show(); // Mostrar el paso anterior
  });

  // Manejar el submit del formulario
  $("#formulario").submit(function (event) {
    event.preventDefault(); // Prevenir la recarga de la página
    // Obtener los datos del formulario en cada paso
    var nombre = $("#nombre").val();
    var apellido = $("#apellido").val();
    var direccion = $("#direccion").val();
    var correo = $("#correo").val();
    var telefono = $("#telefono").val();
    var comentario = $("#comentario").val();
    // Mostrar la información de confirmación en el último paso
    $("#confirmacion-nombre").text("Nombre: " + nombre);
    $("#confirmacion-apellido").text("Apellido: " + apellido);
    $("#confirmacion-direccion").text("Direccion: " + direccion);
    $("#confirmacion-correo").text("Correo electrónico: " + correo);
    $("#confirmacion-telefono").text("Teléfono: " + telefono);
    $("#confirmacion-telefono").text("Comentario: " + comentario);
    // Enviar el formulario o realizar otras acciones necesarias
    // ...

    if ($("#paso3").is(":visible")) {
      // Obtener los datos del formulario
      var doc = new jsPDF();

      // Obtener el contenido del HTML

      doc.text(`Formulario de Contacto`, 10, 10);
      doc.text(`Nombre: ${nombre}`, 10, 20);
      doc.text(`Apellido: ${apellido}`, 10, 30);
      doc.text(`Direccion: ${direccion}`, 10, 40);
      doc.text(`Email: ${correo}`, 10, 50);
      doc.text(`Telefono: ${telefono}`, 10, 60);
      doc.text(`Comentario: ${comentario}`, 10, 70);
      doc.save("formulario.pdf");

      //location.reload()
      //this.reset()
      location.reload();
    }
  });

  /* $("#btn-contacto").submit(function (event) {
    event.preventDefault();
    $("#mensaje").text("El formulario ha sido enviado");
    $("#mensaje").css("color", "red");
  }); */
});
