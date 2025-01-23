
let tareasList = [];


const nuevaTarea = ()=>{
    const ul  = document.getElementById("task-list")
    while(ul.firstChild){
        ul.removeChild(ul.firstChild)
    }
    
    const inputElement = document.querySelector("input").value;
    if(inputElement.trim()){
        
        tareasList.push({
            "descripcion":inputElement,
            "estado": "pendiente"        
        })
    }
    guardarTareasLocalStorage();
    ordenarTareas();

    tareasList.forEach(element => {
        let nuevoElemento = document.createElement("li");
        let tarea = document.createElement("strong");
        let check = document.createElement("span");
        let basurero = document.createElement("span");
        
        if(element.descripcion.trim()){
           
            tarea.textContent = element.descripcion;
    
            basurero.setAttribute("class","material-symbols-outlined trash");
            basurero.textContent="delete";
            
            check.setAttribute("class",`material-symbols-outlined blank-check-btn`);
            check.textContent="check_box";
            
            nuevoElemento.appendChild(check);
            nuevoElemento.appendChild(tarea);
            nuevoElemento.appendChild(basurero);
            nuevoElemento.setAttribute("class", `${element.estado === "pendiente" ? "blank-check" : "done-check"}`);
            nuevoElemento.id=tareasList.indexOf(element);
    
            document.getElementById("task-list").appendChild(nuevoElemento)
        }
    });
    limpiar();
    
} 

const guardarTareasLocalStorage = () =>{

    localStorage.setItem("tareas", JSON.stringify(tareasList));
}
const cargarTareas = ()=>{
    const tareasGuardadas = JSON.parse(localStorage.getItem("tareas"));
    if(tareasGuardadas){
        tareasList=tareasGuardadas
    }
    nuevaTarea();
}



const limpiar= ()=>{
    document.querySelector("input").value = "";

};

document.getElementById("task-list").addEventListener("click", (event) => {
 
    if (event.target && event.target.matches(".trash")){
        tareasList.splice(event.target.parentElement.id,1);
        event.target.parentElement.remove();
        nuevaTarea();
    }
});

document.getElementById("task-list").addEventListener("click", (event)=>{

    if(event.target.matches(".blank-check-btn")&& event.target.parentElement.classList.contains("done-check")){
     
        tareasList[event.target.parentElement.id].estado ="pendiente";
        
        nuevaTarea()
    }
    else if(event.target.matches(".blank-check-btn")){

        tareasList[event.target.parentElement.id].estado ="completado";
       
        nuevaTarea()
    }
    
});
const ordenarTareas = ()=>{

    tareasList.sort((a,b)=> {
        if(a.estado === "pendiente" && b.estado ==="completado"){
            return -1
        }
        if(a.estado === "completado" && b.estado === "pendiente"){
            return 1
        }
        return 0;
    })
}

document.getElementById("submit").addEventListener("click", nuevaTarea);
document.querySelector(".input").addEventListener("keydown", (event)=>{
    if(event.key==="Enter"){
        nuevaTarea()
    }
});
window.onload=cargarTareas();

