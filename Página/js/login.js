$(document).ready(()=>{
  // Verificar si la casilla de admin está activada en el html
  let admin = 0;
  // if($("#admin").is(":checked")) admin = 1;
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
    },
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
    let url = "";
    // Si emailLogin termina en grappe.com, entonces es un administrador
    if(emailLogin.endsWith("grappe.com")) admin = 1;
    else admin = 0;
    if(admin == 1) url = "./php/loginAdmin_AX.php";
    else url = "./php/loginCliente_AX.php";
    $.ajax({
      url:url,
      type:"POST",
      data:{emailLogin:emailLogin, passwordLogin:passwordLogin},
      cache:false,
      success:(respAX)=>{
        let objRespAX = JSON.parse(respAX);
        console.log(admin);
        console.log(respAX);
        let mensaje = "";
        if(objRespAX.cod == 1) mensaje = objRespAX.msj + "\n" + objRespAX.data;
        else mensaje = objRespAX.msj;
        Swal.fire({
          title:"Grappe Shop",
          text: mensaje,
          icon:objRespAX.icono,
          didDestroy:()=>{
            if(objRespAX.cod == 1){
              localStorage.setItem("emailLogin",emailLogin);
              if(admin == 1){
                localStorage.setItem("admin",1);
                window.location.href = "./admin/admin.html";
              }
              else{
                localStorage.setItem("admin",0);
                window.location.href = "./index.html";
              }
            }else{
              // window.location.reload();
            }
          }
        });
      }
    });
  });
});