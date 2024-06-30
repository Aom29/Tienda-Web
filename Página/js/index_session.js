if(!localStorage.getItem("emailLogin")){
  // $("a#nombreUsuario").text("No identificado");
}
// Me redirige a la página de administrador si el usuario es un administrador
if(localStorage.getItem("admin") == 1){
  window.location.href = "./admin/admin.html";
}
$(document).ready(()=>{
  let emailLogin = localStorage.getItem("emailLogin");

  $("a#cerrarSesion").click(()=>{
    localStorage.removeItem("emailLogin");
    localStorage.removeItem("admin");
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