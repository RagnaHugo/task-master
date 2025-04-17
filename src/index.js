
import "./styles.css"
import Task,{Project} from "./task"
import {format,compareAsc} from "date-fns"
import '@fortawesome/fontawesome-free/css/all.min.css';
import { de } from "date-fns/locale";




//AREAS DE PROJECTOS Y TAREAS
const area = document.querySelector(".pre_tasks");
const area_proyectos = document.querySelector(".area_proyectos");
const title_project = document.querySelector(".title_project");
let tasks_events =  document.querySelectorAll(".bar-task");

const modal= document.querySelector("#modal");

//DATOS DEL FROMULARIO DE AÑADIR TAREA
const menu =  document.querySelector(".window-project");
const title= document.querySelector(".titulo")
const description= document.querySelector(".description")
const duedate= document.querySelector(".date")
const priority= document.querySelector(".priority")
const project= document.querySelector(".project")
const button_add= document.querySelector(".aceptar");
const button_add_project= document.querySelector("#add_project");
const confirm_button_project= document.querySelector(".add_project_button");
const name_project= document.querySelector(".name_project");



//agregar proyecto

confirm_button_project.addEventListener("click",(e)=>{

    projectos.push(new Project(name_project.value));
    menu.classList.remove("active")
    actualizar_area();
    actualizar_area_projectos();
    console.log(projectos);

});



//AGREGAR O TESTEAR PROYECTOS

const proyecto_home=new Project("Proyect ");
const projectos=[];
projectos.push(proyecto_home);
let projecto_actual = projectos[0];




const tarea2= new Task("tarea2","aa",new Date(2025,3,7),1,"a");
projecto_actual.addTask(tarea2);




//Funciones para actualizar las areas


const actualizar_area=()=>{
    area.innerHTML="";
   projecto_actual.showTasks(area);
    
  
  
};


const actualizar_area_projectos=()=>{
    
    title_project.textContent=projecto_actual.title;
    area_proyectos.innerHTML="";
    projectos.forEach(element => {
        area_proyectos.appendChild(element.bar_project());
    });
    

    
};



//SE VEN LAS TAREAS y PROYECTOS.

actualizar_area();
actualizar_area_projectos();


//SE AGREGAN LAS TAREAS

button_add.addEventListener("click",(e)=>{   

    e.preventDefault();  

  
    if(!isNaN(Date.parse(duedate.value))){

        const task = new Task(title.value,description.value,duedate.value,priority.value,project.value);
        projecto_actual.addTask(task);
        actualizar_area_projectos();
       actualizar_area();
        
       
        modal.close()

    }
    



    
    console.log(proyecto_home)
   


});


button_add_project.addEventListener("click",(event)=>{
   
 
    event.stopPropagation();
    menu.classList.toggle("active");
})

menu.addEventListener('click', function(e) {
    e.stopPropagation();
  });


  window.addEventListener('click', function(e) {
    menu.classList.remove("active");
  });


 




document.querySelector(".addTask").addEventListener("click",()=>{
    modal.showModal();
    console.log("hola mundo");
});


/*HACER CLICK EN UN PROJECTO SE ACTUALIZE EL AREA DE LAS TAREAS*/

area_proyectos.addEventListener("click",(e)=>{

    const item = e.target.closest(".item-menu");

    if(item){

        title_project.textContent = item.querySelector("p").textContent;
        projecto_actual = projectos.find(e=>e.title==item.querySelector("p").textContent);
        actualizar_area();
        actualizar_area_projectos();

    }

});







/*ELIMINAR TAREAS y MODIFICAR*/



   
    

  
      


    






/*const tarea1= new Task("tarea1","aa",new Date(2025,3,5),1,"a");
const tarea2= new Task("tarea2","aa",new Date(2025,3,7),1,"a");
const tarea3= new Task("tarea3","aa",new Date(2025,3,9),1,"a");

tarea1.isFinished=true;
tarea2.isFinished=true;
tarea3.isFinished=true;

console.log(tarea1,tarea2,tarea3);

tarea1.addMiniTask("correr");

console.log(tarea1.checklist);



tarea1.changeStateMiniTask("correr",true);
console.table(tarea1.checklist);
const proyecto1=new Project();

proyecto1.addTask(tarea1);
proyecto1.addTask(tarea2);
proyecto1.addTask(tarea3);



console.log(proyecto1);


proyecto1.removeTask("tarea2");

console.log(tarea1.isFinished)
console.log(tarea2.isFinished)
console.log(tarea3.isFinished)




console.log(proyecto1.isFinished());*/