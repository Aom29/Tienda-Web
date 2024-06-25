$(document).ready(()=>{
    // const validator = new JustValidate("form#datosLogin",{
    //   errorFieldCssClass: ['invalid'],
    //   errorFieldStyle: {
    //     color: "#7C7EA5",
    //     border: "10px solid #572364",
    //     backgroundColor: '#7C7EA5'
    //   },
    // });
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
      // Swal.fire({
      //   title:"TDAW - 20242",
      //   text:"Formulario validado",
      //   icon:"success",
      //   didDestroy:()=>{
      //     window.location.reload();
      //   }
      // });
      window.location.href = "./index.html";
    });
  });