$(document).ready(()=>{
    let admin = 0;
    // Verificar si la casilla de admin está activada en el html
    // if($("#adminMarked").is(":checked")) admin = 1;
    // Leer el valor del input con la clave (numérica) para iniciar sesión como administrador
    let claveAdmin = "12345678";
    // let claveAdmin = $("input#claveAdmin").val();

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
      let url = "";
      // Si el emailLogin termina en grappe.com es una administrador
      if(emailRegistro.endsWith("grappe.com")) admin = 1;
      else admin = 0;
      if(admin == 1)
        url = "./php/registroAdmin_AX.php";
      else
        url = "./php/registroCliente_AX.php";
      $.ajax({
        url:url,
        type:"POST",
        data:{nombreRegistro:nombreRegistro, apellidoRegistro:apellidoRegistro, emailRegistro:emailRegistro, passwordRegistro:passwordRegistro, claveAdmin:claveAdmin},
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
                // Redirigir al inicio de sesion
                window.location.href = "./login.html";
              }else{
                // window.location.reload();
              }
            }
          });
        }
      });
    });
  });