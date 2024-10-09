// Convertir de Celsius a Fahrenheit
function celsiusToFahrenheit (temp_celsius) { return (temp_celsius * 9 / 5) + 32 }

function fahrenheitToCelsius (temp_fahrenheit) { return (temp_fahrenheit - 32) * 5 / 9 }

function temperatura (temp, grado) { 

    if(grado === 'Celsius') {
        return celsiusToFahrenheit (temp);
    }
    else if (grado ==='Fahrenheit') {
        return fahrenheitToCelsius (temp);
    }
    else {
        return 'Ingresa correctamente el grado'
    }

 }



const esPrimo = (number) => {

    let primo = true;

    if(number > 1){
        for (let index = 2; index < number; index++) {
            if (number % index == 0 ){
                primo = false;
                break;
            }
            
        }
    }
    
    if (primo) {
       return 'es primo';
    } else {
       return 'no es primo';
    }

}

function capicua (number) {    

    number = number.toString();

    return number.split("").reverse().join("") === number

}

function money (valor){

    let string = valor.toString();

    if(string.length > 3 && string.length < 7){

        for (let index = 0; index < string.length; index++) {
            
                              

            }

    }
    else
        return false;

}




//const x = `something ${}` 
//console.log(celsiusToFahrenheit(20));
//console.log(fahrenheitToCelsius(68));
//console.log(temperatura(20,'Celsius'));
//console.log(esPrimo(4));
//console.log(capicua(454));
//console.log(money(123456));