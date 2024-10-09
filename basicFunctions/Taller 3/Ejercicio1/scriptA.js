window.addEventListener("load", cargar());

function cargar(){
    let listCars = ["Toyota","Mazda","Susuki","Nissan"]
    let autos = "autos"
    desplegar(listCars,autos);  
};

function desplegar(list,x){
   
    elpar.appendChild(document.createTextNode('Una lista de ' + list.length + ' ' + x ));  
    
    let ulElement = document.querySelector('ul');  

    for (let i = 0; i < list.length; i++) {
        let itemElement = document.createElement('li')
        itemElement.textContent = list[i]
        ulElement.appendChild(itemElement)
    }
};

