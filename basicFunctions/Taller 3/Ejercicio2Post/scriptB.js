function isNumber(x) {
    /* para ayudar en la validación */
    return !isNaN(parseInt(x));
}
function validar() {
     /* aqui escribir el codigo de la funcion validar
       debe retornar true si la validacion pasa y false si no pasa
       si la validacion falla debe cambiar tambien la cara a una triste
    */
    const nombre = document.getElementById('nombre').value;
    const inicial = document.getElementById('inicial').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    const msg = document.getElementById('mensaje');
    let flag = true;
   
    if (nombre.length < 4) {
        msg.appendChild(document.createTextNode('El nombre debe tener al menos 4 caracteres'));
        flag = false;
        document.querySelector('img').src = "sad.png";
    } else if(edad < 18){
        msg.appendChild(document.createTextNode('Debe ser mayor de 18!'));       
        flag = false;
        document.querySelector('img').src = "sad.png";
    }

    return flag;
}

