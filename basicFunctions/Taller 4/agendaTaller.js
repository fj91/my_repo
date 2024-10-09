// inicializar las variables o constantes asociada a los botones y al mensaje final
const botonIngresar = document.getElementById('ingresar');
const botonAll  = document.getElementById('all');
const botonActivas  = document.getElementById('activas');
const botonTerminadas  = document.getElementById('terminadas');
const botonEliminaTerm  = document.getElementById('elimTerm');
const info  = document.getElementById('info');


// la lista de objetos tarea
let tasks = [{'id':0, 'active':true, 'what':"estudiar JavaScript"}, {'id':1, 'active':true, 'what':"instalar VSCode"}];
let n = 2 //lleva la cuenta del número de objetos en la lista
// inicializar la variable con el elemento ul de la lista y el elemento de input
let laLista  = document.getElementById('lista');
let elInput  = document.getElementById('todo');


// agregar listeners para click en los botones y para change en elemento de input
botonIngresar.onclick = agregarItem;
botonAll.onclick = all;
botonActivas.onclick = activas;
botonTerminadas.onclick = terminadas;
botonEliminaTerm.onclick = eliminaTerm;
elInput.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {		
		agregarItem();		
	}
});
 
/*var addTask = function() {
	var text = elInput.value;
	var p = document.createElement('p');
	p.innerHTML = text
	laLista.appendChild(p);	
}
  
botonIngresar.onclick = addTask;*/

function agregarItem() {
	// agrega una nueva tarea al modelo de datos
	tasks.push({'id': n+1,'active': true,'what': elInput.value})
	n++;
	// llama a una función para desplegar la lista de tareas actualizada
	laLista.innerHTML = "";
	for (t of tasks) {
		agregarAlista(laLista, t)
	}
	// llama a la función que escribe el sumario resumen al final
	summary();
	elInput.value = "";
}

function all() {
	// despliega los items de tareas en la lista
	laLista.innerHTML = "";
	// llama a agregarAlista por cada tarea de la lista
	for (t of tasks) {
		agregarAlista(laLista, t)
	}
	summary();
}

function agregarAlista(laLista, task) {
	// crea un nuevo elemento p con un listener para click	
	var p = document.createElement('p');
	p.innerHTML = task.what
	p.addEventListener("click",manejarclick);
	// agrega atributos id y class 
	const id = document.createAttribute("id");
	const active = document.createAttribute("active");
	const att = document.createAttribute("class");
	id.value = task.id;
	active.value = task.active;
	if (task.active) {
		att.value = "activa";
	}else
		att.value = "inactiva";	
	p.setAttributeNode(id);
	p.setAttributeNode(active);
	p.setAttributeNode(att);
	// agregar el elemento a la lista
	laLista.appendChild(p);
}

function activas() {
	// borra el innerHTML de la lista
	laLista.innerHTML = "";
	// recorre la lista de tarea y agrega solo las activas con agregarAlista
	for (t of tasks) {
		if(t.active) {
		agregarAlista(laLista, t)
		}
	}
}

function terminadas() {
	// borra el innerHTML de la lista
	laLista.innerHTML = "";
	// recorre la lista de tarea y agrega solo las inactivas con agregarAlista
	for (t of tasks) {
		if(!t.active) {
		agregarAlista(laLista, t)
		}
	}
}

function enpar(event) {
	// función que debe cambiar una tarea de activa a inactiva o viceversa en la lista de tareas
	// la tarea a cambiar es la que tiene el mismo id del elemento que recibe el click event.srcElement.id
	
}


function summary() {
	// genera la línea resumen
	// debe contar las activas desde la lista de tareas, las inactivas se deducen restando al total	
	let act = 0
	let inac = 0
	for (t of tasks) {
		if (t.active) {act ++}
		else{
			inac ++
		}
	}
	info.innerHTML = tasks.length + " item en total, " + act + " activas y " + inac + " inactivas";
}

function eliminaTerm() {
	// debe dejar solo las activas en la lista de tareas		
	let i = tasks.length;

	while (i--) {  	
  		if (!tasks[i].active) {    	
    	tasks.splice(i, 1);    	
  		}
	}
	summary();
}

function manejarclick() {
	let id = event.srcElement.id
	for (t of tasks) {
		if(t.id == id){
			if (t.active) {
				t.active = false;
				event.srcElement.setAttribute("active",false)
				event.srcElement.setAttribute("class","inactiva")		
			} else {
				t.active = true;
				event.srcElement.setAttribute("active",true)
				event.srcElement.setAttribute("class","activa")					
			}
		}
	}	
	summary();
}