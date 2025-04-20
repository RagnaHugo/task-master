
import "./styles.css"
import Task,{Project} from "./task"
import {format,compareAsc} from "date-fns"
import { parse, isAfter, subDays, startOfDay } from "date-fns";

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
const text_area= document.querySelector("textarea");
const button_cancel=document.querySelector(".cancel")



//AGREGAR O TESTEAR PROYECTOS
let project_combo = document.querySelector(".project");

const prios=["Low","Medium","High"];
// Initialize empty arrays first
let tasks = [];
let projectos = [];

// Then load saved data if available
const savedData = cargarTodo();
if (savedData.tareas.length > 0 || savedData.proyectos.length > 0) {
  tasks = savedData.tareas;
  projectos = savedData.proyectos;
  console.log(tasks);
  console.log(projectos);
} else {
  // Create default project if no data exists
  const proyecto_home = new Project("Proyect");
  projectos.push(proyecto_home);
  
  // You can add a sample task if needed
  const tarea2 = new Task("tarea2", "aa", new Date(2025, 3, 7), prios[0], "Sample notes");
  proyecto_home.addTask(tarea2);
  tasks.push(tarea2);
}

// Set the active project
let projecto_actual = projectos[0];






function clean_fields(){
    title.value="";
    description.value="";
    duedate.value="";
    priority.value="";
    text_area.value="";
}


button_cancel.addEventListener("click",(e)=>{

    e.preventDefault();
    modal.close();
   
});


//agregar proyecto

confirm_button_project.addEventListener("click",(e)=>{

    projectos.push(new Project(name_project.value));
    menu.classList.remove("active")
    actualizar_area();
    actualizar_area_projectos();
    console.log(projectos);

});












//Funciones para actualizar las areas


const actualizar_area=()=>{
   
   
   area.innerHTML="";
   projecto_actual.showTasks(area);
   guardarTodo();
    
  
  
};


const actualizar_area_projectos=()=>{
    
    title_project.textContent=projecto_actual.title;
    area_proyectos.innerHTML="";
   
    projectos.forEach(element => {
        const div = document.createElement("div");
        area_proyectos.appendChild(element.bar_project(div));
    });

    actualizar_combo();
    guardarTodo();

    
};



//SE VEN LAS TAREAS y PROYECTOS.

actualizar_area();
actualizar_area_projectos();

// actualizar combo box de proyectos

function actualizar_combo(){


project_combo.innerHTML="";
projectos.forEach((element)=>{
    const option_project = document.createElement("option");
    option_project.value = element.title;
    option_project.textContent = element.title;
    project_combo.appendChild(option_project);
    

});

}

//SE AGREGAN LAS TAREAS

button_add.addEventListener("click",(e)=>{   

    e.preventDefault();  

    if(!isNaN(Date.parse(duedate.value))){

        const task = new Task(title.value,description.value,duedate.value,priority.value,text_area.value);
        
        let project_agregar = projectos.findIndex(u=>u.title==project_combo.value);
        projectos[project_agregar].addTask(task);
        actualizar_area_projectos();
       actualizar_area();
     
       
        modal.close()

    }
    



    
    
   


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
    clean_fields();
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

    project_combo.value=projecto_actual.title;

});



const today_button = document.querySelector(".action-today");


today_button.addEventListener("click",(e)=>{

    const fecha= new Date();
    console.log(fecha);

    const project_today = new Project("Today");


     projectos.forEach(e_project => {

        e_project.tasks.forEach(e_task => {

            console.log(e_task.formattedDueDate);
            
          if(e_task.formattedDueDate===format(fecha, "MMMM dd, yyyy")){

            
            project_today.addTask(e_task);
          } 
       
           
            

        });     

    });

    projecto_actual=project_today;
    actualizar_area();
    actualizar_area_projectos();
});


   // acciones completadas



   
const completed_button = document.querySelector(".action-completed");


completed_button.addEventListener("click",(e)=>{

    title_project.textContent="Completed Tasks";
    area.innerHTML="";

     projectos.forEach(e_project => {

     

        e_project.tasks.forEach(e_task => {

            
        
          
            
            if(e_task.isFinished){


                e_task.isFinished=false;
               
               let task_main= e_task.bar_task()
                area.appendChild(task_main);

                area.querySelectorAll("input").forEach(e=>{
                    e.checked=true;
                    e.style.pointerEvents = "none"; 
                });
               
                task_main.addEventListener("click",(e)=>{
                   
                    if(e.target.closest(".remove")){

                            task_main.style.display="none";
                            e_task.removeOriginProject();

                            actualizar_area_projectos();
                          
                           
                    }
                    
                });
                
                e_task.isFinished=true;
            }

          

            
            
           
            

        });     

    });

   


   


});
    


document.addEventListener("click",(e)=>{

    if(e.target.closest(".done")){
      
        actualizar_area_projectos();
       
    }
});



const up_button = document.querySelector(".action-up");

up_button.addEventListener("click", (e) => {
    const fecha = new Date();
    console.log("Fecha actual:", fecha);

    const project_upcoming = new Project("Upcoming Tasks");

    const hoy = startOfDay(fecha); 

    projectos.forEach(e_project => {
        e_project.tasks.forEach(e_task => {
            const fechaTarea = parse(e_task.formattedDueDate, "MMMM dd, yyyy", new Date());

            if (isAfter(fechaTarea, subDays(hoy, 1))) { // Igual o después de hoy
                project_upcoming.addTask(e_task);
            }
        });
    });

    projecto_actual = project_upcoming;
    actualizar_area();
    actualizar_area_projectos();
});






/*JSON GUARDAR*/
function guardarTodo() {
    const tareasSerializadas = [];
    const proyectosSerializados = [];
  
    // Collect all unique tasks across all projects
    const allTasks = new Set();
    projectos.forEach(p => {
      p.tasks.forEach(t => allTasks.add(t));
    });
    
    // Serialize tasks
    Array.from(allTasks).forEach(t => {
      // Handle date serialization safely
      let dueDateValue;
      if (t.dueDate instanceof Date) {
        dueDateValue = t.dueDate.toISOString();
      } else if (typeof t.dueDate === 'string') {
        dueDateValue = t.dueDate;
      } else {
        // Fallback if dueDate is neither a Date nor a string
        dueDateValue = new Date().toISOString();
        console.warn("Invalid dueDate for task:", t.title);
      }
  
      tareasSerializadas.push({
        id: t.id instanceof Date ? t.id.getTime() : new Date().getTime(),
        title: t.title,
        description: t.description,
        dueDate: dueDateValue,
        priority: t.priority,
        notes: t.notes,
        checklist: t.checklist || [],
        isFinished: t.isFinished || false
      });
    });
  
    // Serialize projects
    projectos.forEach(p => {
      const taskIDs = [];
      p.tasks.forEach(t => {
        taskIDs.push(t.id instanceof Date ? t.id.getTime() : new Date().getTime());
      });
  
      proyectosSerializados.push({
        title: p.title,
        taskIDs: taskIDs
      });
    });
  
    localStorage.setItem("tareas", JSON.stringify(tareasSerializadas));
    localStorage.setItem("proyectos", JSON.stringify(proyectosSerializados));
    
    console.log("Data saved to localStorage");
  }

//cargar todo desde el json

function cargarTodo() {
    const tareasGuardadas = localStorage.getItem("tareas");
    const proyectosGuardados = localStorage.getItem("proyectos");
  
    if (!tareasGuardadas || !proyectosGuardados) {
      return { tareas: [], proyectos: [] };
    }
  
    const tareasData = JSON.parse(tareasGuardadas);
    const proyectosData = JSON.parse(proyectosGuardados);
  
    const tareas = [];
    const proyectos = [];
  
    // Create task objects first
    tareasData.forEach(t => {
      const nuevaTarea = new Task(
        t.title,
        t.description,
        new Date(t.dueDate),
        t.priority,
        t.notes
      );
      nuevaTarea._checklist = t.checklist || [];
      nuevaTarea.isFinished = t.isFinished || false;
      nuevaTarea.id = new Date(t.id); // Convert timestamp back to Date object
      tareas.push(nuevaTarea);
    });
  
    // Then restore projects and their task references
    proyectosData.forEach(p => {
      const nuevoProyecto = new Project(p.title);
  
      p.taskIDs.forEach(taskId => {
        const tarea = tareas.find(t => t.id.getTime() === taskId);
        if (tarea) {
          nuevoProyecto.addTask(tarea);
        }
      });
  
      proyectos.push(nuevoProyecto);
    });
  
    return { tareas, proyectos };
  }
  


    
window.onbeforeunload = function () {
    console.log("texyaaaaa");
  };
  





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