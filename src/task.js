import {format} from "date-fns"
import { formatInTimeZone } from "date-fns-tz";

class Task{

    constructor(title,description,dueDate,priority,notes){
        this._title=title;
        this._description=description;
        this._dueDate=dueDate;
        this._priority=priority;
        this._notes=notes;
        this._checklist=[];
        this._isFinished=false;
        this.id = new Date();
        this._timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this._formattedDueDate = formatInTimeZone(this._dueDate, this._timeZone, "MMMM dd, yyyy");
        this.parentProjects = [];
    }


    

    removeOriginProject() {
        console.log("borro");
        console.log(this.parentProject);

        this.parentProjects.forEach(element => {
            element.removeTask(this.id);
        });
        
     
    }


    addParentProject(project){
        this.parentProjects.push(project);
    }

     get formattedDueDate() {
        return this._formattedDueDate;
      }
      



   
    set isFinished(value){
        this._isFinished=value;
    }

    get isFinished(){
        return this._isFinished;
    }


    addMiniTask(title){
        this._checklist.push({name:title,state:false});
    }

    changeStateMiniTask(title,state){

        this._checklist.find(e=>e.name==title).state=state;

    }


    get checklist(){
        return this._checklist;
    }

    get notes(){
        return this._notes;
    }

    set notes(value){
        this._notes=value;
    }


    get description(){
        return this._description;
    }

    set description(value){
        this._description=value;
    }

    get priority(){
        return this._priority;
    }

    set priority(value){ 
       
        this._priority=value;
    }

    


    get dueDate(){
       
        return this._dueDate;
    }

    set dueDate(value){
        format(value,"MMMM dd, yyyy")
        this._dueDate=value;
    }


    get title(){
        return this._title;
    }

    set title(value){
        if(value=="JAJA")
            console.log("ESTAS BIEN PARKER?");
        this._title=value;
    }


    bar_task(){
       
       
        const  div=document.createElement("div");
        if(!this.isFinished){

            const  details=document.createElement("details"); 
            const  summary= document.createElement("summary");
            summary.setAttribute("class","bar-task")
            const info_task= document.createElement("div");
            info_task.setAttribute("class","info-task");
            const check_type= document.createElement("input");
            check_type.setAttribute("type","checkbox");
            check_type.className="done";
            const span_title= document.createElement("span");
            span_title.className="title-span"
            span_title.textContent=this.title;
            const p_fecha= document.createElement("p");
            p_fecha.textContent=this.formattedDueDate;
        
            const div_iconos= document.createElement("div");
            div_iconos.setAttribute("class","icons-task");
            div_iconos.innerHTML=` <i class="fa-regular fa-pen-to-square edit"></i>
                                <i class="fa-solid fa-trash remove"></i>`;
        
        
            
            
                             
            summary.appendChild(info_task);
            summary.appendChild(div_iconos);
            info_task.appendChild(check_type);
            info_task.appendChild(span_title);
            info_task.appendChild(p_fecha);
        
         
        
        
            const content_details = document.createElement("div");
            content_details.setAttribute("class","content-details");
        
           const span_description_title = document.createElement("span"); 
            span_description_title.textContent="Description";
            const span_description = document.createElement("span");
            span_description.textContent=this._description; 
        
            const span_priority_title = document.createElement("span"); 
            span_priority_title.textContent="Prioridad";
            const span_priority = document.createElement("span"); 
            span_priority.textContent=this.priority;
            const span_notes_title= document.createElement("span"); 
            span_notes_title.textContent="Notes:";
            const span_notes = document.createElement("span"); 
            span_notes.textContent=this._notes;
        
        
            content_details.appendChild(span_description_title);
            content_details.appendChild(span_description);
            content_details.appendChild(span_priority_title);   
            content_details.appendChild(span_priority);   
            content_details.appendChild(span_notes_title);
            content_details.appendChild(span_notes);
        
            
        
        
           
        
            details.appendChild(summary);
            details.appendChild(content_details);
            
            
             return details;

        }


        return div;
   
    }



}


const modal = document.querySelector("#modal-edit");
//DATOS DEL FROMULARIO DE AÑADIR TAREA
const title= document.querySelector(".titulo-edit")
const description= document.querySelector(".description-edit")
const duedate= document.querySelector(".date-edit")
const priority= document.querySelector(".priority-edit")
const button_edit= document.querySelector(".edit-task");
const name_project= document.querySelector(".name_project");
const notes= document.querySelector(".textarea-edit");
const button_cancel_edit = document.querySelector(".cancel-edit");

function clean_fields(){
    title.value="";
    description.value="";
    duedate.value="";
    priority="";
    notes.value="";
}


button_cancel_edit.addEventListener("click",(e)=>{

    e.preventDefault();
    modal.close();

});




class Project{

    constructor(title){
        this._title=title;
        this._tasks=[];
        this.div_tareas= document.createElement("div");
        
    }

    addTask(task) {
        task.addParentProject(this);
        this._tasks.push(task);
        // Añade este proyecto como padre de la tarea
    }


    

    clean(){

        this.tasks.splice(0,this.tasks.length);
    }


    get tasks(){
        return this._tasks;
    }


   

    // addTask(task){
    //     task.parentProject = this;
    //     this._tasks.push(task);
    // }

    removeTask(num_id){
        
            let id_remove = this._tasks.findIndex(u=>u.id==num_id);
             this._tasks.splice(id_remove,1);
       
     }
      
    // }

    findTask(title){
     
        return  this._tasks.find(u=>u.title==title);
    }


    isFinished(){

      return  this._tasks.every(e=>{
               return e.isFinished==true;
        });
        
    }

    get title(){
        return this._title;
    }


    showTasks(container){


        
        container.innerHTML="";
        

        

        this._tasks.forEach((task)=>{

            
            const task_actual=task.bar_task();

            task_actual.addEventListener("click",(e)=>{

                if(e.target.closest(".done")){
                    task.isFinished=true;
                 
                    console.log(task.isFinished);
                    this.showTasks(container);
                  
                   
                }
            
            
            if(e.target.closest(".remove")){

                if (e.target.closest(".remove")) {
                    
                    const id_remove = this._tasks.findIndex(u=>u.id==task.id);
                   
                    task.removeOriginProject();
                    this.showTasks(container);
                }
              
            
               
                
            }

            if(e.target.closest(".edit")){
                               
              modal.showModal();
              title.value=task.title;
              description.value=task.description;
              
              
              priority.value=task.priority;
            
              notes.value= task.notes;
              duedate.value = format(task.dueDate, "yyyy-MM-dd")

              button_edit.addEventListener("click",(e)=>{

                e.preventDefault();

              task.title = title.value;
              task.description=description.value;
              task.priority=priority.value;
              task.notes=notes.value;
              task.dueDate =duedate.value;

              modal.close();
              this.showTasks(container);
              
            });
            
          
            
               
                
            }


            

        });
            
       
        container.appendChild(  task_actual);

        });

       

    }



    bar_project(item_project){
      
        const i= document.createElement("i");
        item_project.setAttribute("class","item-menu");
        i.setAttribute("class","fa-solid fa-hashtag icon");
        const p= document.createElement("p");
        p.textContent=this.title;
        const p_tareas =   document.createElement("p");
        p_tareas.className="nro";
        p_tareas.textContent= this.tasks.length;


        item_project.appendChild(i);
        item_project.appendChild(p);
        item_project.appendChild(p_tareas);
                    



        return item_project;
    }


    


}






export default Task;
export {Project};