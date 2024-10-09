const PersonaLit = {
    name: 'Fernando',
    age: 31,
    hobbies: ["uno","dos"],
    greet: () => console.log('Hello everyone'),
    score: { math: 10 , science: 9}
}
console.log(PersonaLit);

function Person (name,age,hobbies,greet,score){
    this.name = name
    this.age = age
    this.hobbies = hobbies
    this.greet = greet
    this.score = score
}
let p = new Person(...Object.values(PersonaLit));

console.log(p)

class Person2 {
    
    constructor(name,age,hobbies,score){
        this.name = name
        this.age = age
        this.hobbies = hobbies       
        this.score = score
    }

    greet () {
        return console.log('Hello everyone');
    }

}

let p2 = new Person2 ('Jose', 20 , ['Futbol','Basket'],{math: 10, science: 12})

console.log(p2)



//--------------------------------------------------------------------


const students = [{name: 'Sara', age:24},{name: 'John', age:24}, {name: 'Jack', age:25}];

console.log(students);

function compara1 (o1,o2){ return o1.name > o2.name ? 1 : -1 }

console.log(students.sort(compara1));

function compara2 (o1,o2){ return o1.age > o2.age ? 1 : -1 }

console.log(students.sort(compara2));


//-----------------------------------------------------------------------


class HospitalEmployee {
    constructor(name){
        this.name = name
    }
}

class Doctor extends HospitalEmployee{

    constructor(name,vacaciones_restantes = 20,seguro,){
        super(name);
        this.vacaciones_restantes = vacaciones_restantes,
        this.seguro = seguro
    }

    tomarVacaciones(días){
        agregar_certificacion();
    }; 
}

class  Enfermera extends HospitalEmployee{
    constructor(name,vacaciones_restantes,certificaciones){
        super(name);
        this.vacaciones_restantes = vacaciones_restantes
        this.certificaciones = certificaciones
    }
}

const doc1 = new Doctor ('Juan', 25 , true)
const doc2 = new Doctor ('Pedro', 30 , false)
const nurse1 = new Enfermera ('Maria', 5 , [])
const nurse2 = new Enfermera ('Claudia', 10 , ['DDAM'])

console.log(doc1)
console.log(doc2)
console.log(nurse1)
console.log(nurse2)

doc1.tomarVacaciones(5);
nurse2.tomarVacaciones(3);