if(!sessionStorage.getItem("emailLogin")){
  $("a#nombreUsuario").text("No identificado");
}
$(document).ready(()=>{
  let emailLogin = sessionStorage.getItem("emailLogin");

  $("a#cerrarSesion").click(()=>{
    sessionStorage.removeItem("emailLogin");
    window.location.href = "./index.html";
  });

  $.ajax({
    // Aquí va todo lo relacionado a cuando se cumple la consulta
    // Se puede llenar el nombre del usuario en la parte superior
    url:"./php/session_AX.php",
    type:"POST",
    data:{emailLogin:emailLogin},
    cache:false,
    success:(respAX)=>{
      console.log(emailLogin);
      let objAX = JSON.parse(respAX);
      $("a#nombreUsuario").text(objAX.msj);
    }
  });
});