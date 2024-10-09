// Fernando Javier Collado Rodríguez
//a)
let l1 = [5, 2, 7, 3];
function elevarTwo (num){ return Math.pow(num,2) }

function myMap (list,fun){
    let result = []; 
    for (const key in list) {
        result.push(fun(list[key]));
    }
    return result;
}
console.log(l1);
console.log(myMap(l1,elevarTwo));

//b)

function subrayar (num){
    let result = "";
    if(num <= 0){
        return result;
    }
    else{
        for (let index = 0; index < num; index++) {
            result += "-";         
        }
    }
    return result;
}
/*console.log(subrayar(0));
console.log(subrayar(-2));
console.log(subrayar(3));
console.log(subrayar(5));
console.log(subrayar(10));*/

//c)
console.log(myMap(l1,subrayar));

//d)
let l2 = ['texto 1', 'texto 2', 'otro texto']

function addTags(tag){
    const a1 = '<';
    const a2 = '>';
    const a3 = '/>';
    return function funct(valor) {
        return `${a1}${tag}${a2} ` + valor + ` ${a1}${tag}${a3}`
    }
}

console.log(myMap(l2,addTags('h2')));
console.log(myMap(l2,addTags('li')));
