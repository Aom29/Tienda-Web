if(!localStorage.getItem("emailLogin")){
    window.location.href = "./../login.html";
}
// Me redirige a la página de administrador si el usuario es un administrador
if(localStorage.getItem("admin") == 0){
    window.location.href = "./../index.html";
}
$(document).ready(()=>{
    let emailLogin = localStorage.getItem("emailLogin");
    console.log(emailLogin);
    console.log(localStorage.getItem("admin"));
    $("a#cerrarSesion").click((event)=>{
        event.preventDefault();
        localStorage.removeItem("emailLogin");
        localStorage.removeItem("admin");
        window.location.href = "../login.html";
    });
});