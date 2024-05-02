import esUnCuil from "./validar-cuil.js";
import esMayorDeEdad from "./validar-edad.js";
import {tiposError,mensajes} from "./custom-error.js";

const camposForm = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

formulario-addEventListener("submit", (e)=>{
    e.preventDefault(); //El comportamiento por default del formulario es recargar la pagina cuando se envia
    const listaRespuestas = {
        nombre: e.target.elements["nombre"].value,
        email: e.target.elements["email"].value,
        identificacion: e.target.elements["identificacion"].value,
        cuil: e.target.elements["cuil"].value,
        fecha_nacimiento: e.target.elements["fecha_nacimiento"].value,
    }
    localStorage.setItem("registro", JSON.stringify(listaRespuestas));
    window.location.href = "./abrir-cuenta-form-2.html";
})

camposForm.forEach(campo => {
    campo.addEventListener("blur", () => { verificarCampo(campo) })
    campo.addEventListener("invalid", evento => { evento.preventDefault() }) //Previene los mensajes por default de los campos para poder customizarlos
});  

function verificarCampo(campo) {
    let mensaje = "";
    campo.setCustomValidity("");

    if (campo.name == "cuil" && campo.value.length >= 11) {
        esUnCuil(campo);
    }
    if (campo.name == "fecha_nacimiento" && campo.value != "") {
        esMayorDeEdad(campo);
    }

    tiposError.forEach(error => {
        if(campo.validity[error]){ 
            mensaje = mensajes[campo.name][error]; 
            console.log(mensaje);
        }
    })

    const mensajeError = campo.parentNode.querySelector(".mensaje-error");
    const validarInputCheck =campo.checkValidity()
    if(!validarInputCheck){
        mensajeError .textContent = mensaje;
    }else{
        mensajeError .textContent = "";
    }
}