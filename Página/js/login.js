$(document).ready(()=>{
  const validator = new JustValidate("form#datosLogin")

  validator
  .addField("input#emailLogin",[
    {
      rule:"required",
      errorMessage:"Ingresar correo",
    },
    {
      rule:"email",
      errorMessage:"Formato incorrecto"
    }
  ])
  .addField("input#passwordLogin",[
    {
      rule:"required",
      errorMessage:"Ingresar contraseña"
    },
    {
      rule: "password",
      errorMessage: 'Mínimo con 8 caracteres, incluidos una letra y un número'
    }
  ])
  .onSuccess((evt)=>{
    evt.preventDefault();
    let emailLogin = $("#emailLogin").val();
    let passwordLogin = $("#passwordLogin").val();
    $.ajax({
      url:"./php/login_AX.php",
      type:"POST",
      data:{emailLogin:emailLogin, passwordLogin:passwordLogin},
      cache:false,
      success:(respAX)=>{
        let objRespAX = JSON.parse(respAX);
        let mensaje = "";
        if(objRespAX.cod == 1) mensaje = objRespAX.msj + "\n" + objRespAX.data;
        else mensaje = objRespAX.msj;
        Swal.fire({
          title:"Grappe Shop",
          text: mensaje,
          icon:objRespAX.icono,
          didDestroy:()=>{
            if(objRespAX.cod == 1){
              sessionStorage.setItem("emailLogin",emailLogin);
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