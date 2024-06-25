$(document).ready(()=>{
    const validator = new JustValidate("form#datosRegistro");

    validator
    .addField("input#nombreRegistro",[
      {
        rule:"required",
        errorMessage:"Ingresa tu nombre"
      }
    ])
    .addField("input#apellidoRegistro",[
      {
        rule:"required",
        errorMessage:"Ingresa tu apellido"
      }
    ])
    .addField("input#emailRegistro",[
      {
        rule:"required",
        errorMessage:"Falta tu correo electrónico"
      },
      {
        rule:"email",
        errorMessage:"Formato incorrecto"
      }
    ])
    .addField("input#passwordRegistro",[
      {
        rule:"required",
        errorMessage:"Falta tu contraseña"
      },
      {
        rule: "password",
        errorMessage: 'Mínimo 8 caracteres, incluidos una letra y un número'
      }
    ])
    .onSuccess((evt)=>{
      evt.preventDefault();
      Swal.fire({
        title:"Grappe Shop",
        text:"Registro completado con éxito",
        icon:"success",
        didDestroy:()=>{
          window.location.reload();
        }
      });
    });
  });