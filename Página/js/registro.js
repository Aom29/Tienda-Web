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
      let nombreRegistro = $("#nombreRegistro").val();
      let apellidoRegistro = $("#apellidoRegistro").val();
      let emailRegistro = $("#emailRegistro").val();
      let passwordRegistro = $("#passwordRegistro").val();
      $.ajax({
        url:"./php/registro_AX.php",
        type:"POST",
        data:{nombreRegistro:nombreRegistro, apellidoRegistro:apellidoRegistro, emailRegistro:emailRegistro, passwordRegistro:passwordRegistro},
        cache:false,
        success:(respAX)=>{
          let objRespAX = JSON.parse(respAX);
          let mensaje = "";
          mensaje = objRespAX.msj;
          Swal.fire({
            title:"Grappe Shop",
            text: mensaje,
            icon:objRespAX.icono,
            didDestroy:()=>{
              if(objRespAX.cod == 1){
                sessionStorage.setItem("emailRegistro",emailRegistro);
                window.location.href = "./index.html";
              }else{
                // window.location.reload();
              }
            }
          });
        }
      });
    });
  });