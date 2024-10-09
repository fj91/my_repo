// Fernando Javier Collado Rodríguez

//a)

class rectangulo {
    constructor (largo,ancho){
        this.largo = largo,
        this.ancho = ancho
    }

    area(largo,ancho){ return largo * ancho };
    perimetro(largo,ancho){return (2*largo) + (2*ancho)};

}
//let rect= new rectangulo(4,5)
//console.log(rect.area(rect.largo,rect.ancho));

//b)
class cuadrado extends rectangulo {
    constructor (lado){
        super(lado,lado)         
    }

    area(lado){ return Math.pow(lado,2) };
    perimetro(lado){ return lado * 4 };

}
//let cuad = new cuadrado(5)
//console.log(cuad.area(cuad.largo));
//console.log(cuad.perimetro(cuad.largo));

//c)
let f1 = new cuadrado(10);
let f2 = new rectangulo(4,9);
let f3 = new cuadrado(6);
//d)
let l = [f1,f2,f3]
//console.log(l);
//e)

function areaTotal (list) { 
    let element = 0
    for (let index = 0; index < list.length; index++) {        
        element += list[index].area(list[index].largo,list[index].ancho);                   
    }
   return element;
}

console.log('El área Total es ' + areaTotal(l));

//f)
function perimetroTotal (list) { 
    let element = 0
    for (let index = 0; index < list.length; index++) {
        element += list[index].perimetro(list[index].largo,list[index].ancho);                     
    }
   return element;
}

//g)
console.log('El perímetro Total es ' + perimetroTotal(l));

//h)
function equalArea(o1,o2) { 
    let flag = true;
    if (o1.area(o1.largo,o1.ancho) === o2.area(o2.largo,o2.ancho)) {
        return flag;
    }
    else{
        flag = false
    }
     
    return flag;
}

console.log(equalArea(f2,f3));
console.log(equalArea(f1,f2));

//j)
function filterFig (list,fig) {
    let sameArea = [];
    for (let index = 0; index < list.length; index++) {
        if(equalArea(list[index],fig)){
            sameArea.push(list[index]);
        }                  
    }
    return sameArea;
}
console.log(filterFig(l,f3));