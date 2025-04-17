import {format} from "date-fns"

class Task{

    constructor(title,description,dueDate,priority,notes){
        this._title=title;
        this._description=description;
        this._dueDate=format(dueDate,"MMMM dd, yyyy ");
        this._priority=priority;
        this._notes=notes;
        this._checklist=[];
        this._isFinished=false;
        this.id = new Date();
    
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
        if(value>3)value=3;
        if(value<0)value=1;
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
        


    const  details=document.createElement("details");
    const  summary= document.createElement("summary");
    summary.setAttribute("class","bar-task")
    const info_task= document.createElement("div");
    info_task.setAttribute("class","info-task");
    const check_type= document.createElement("input");
    check_type.setAttribute("type","checkbox");
    const span_title= document.createElement("span");
    span_title.className="title-span"
    span_title.textContent=this.title;
    const p_fecha= document.createElement("p");
    p_fecha.textContent=this.dueDate;

    const div_iconos= document.createElement("div");
    div_iconos.setAttribute("class","icons-task");
    div_iconos.innerHTML=` <i class="fa-regular fa-pen-to-square edit"></i>
                        <i class="fa-solid fa-trash remove"></i>`;


    
    
                     
    summary.appendChild(info_task);
    summary.appendChild(div_iconos);
    info_task.appendChild(check_type);
    info_task.appendChild(span_title);
    info_task.appendChild(p_fecha);



    // const content_details = document.createElement("div");
    // div_iconos.setAttribute("class","content-details");
    // const span_description_title = document.createElement("span"); 
    // const span_description = document.createElement("span"); 
    // const span_priority_title = document.createElement("span"); 
    // const span_priority = document.createElement("span"); 
    // span_priority.textContent=this.priority
    




    details.appendChild(summary);
    
     return details;
    }



}




class Project{

    constructor(title){
        this._title=title;
        this._tasks=[];
        this.div_tareas= document.createElement("div");
    }


    get tasks(){
        return this._tasks;
    }

    addTask(task){
        this._tasks.push(task);
    }

    removeTask(num_id){
        
        let id_remove = this._tasks.findIndex(u=>u.id==num_id);
        this._tasks.splice(id_remove,1);
        // if(id_remove!=-1){
        //     this._tasks.splice(id_remove,1);
        // }
      
    }

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

           
            
            
            if(e.target.closest(".remove")){
                this.removeTask(task.id);
                this.showTasks(container);
                 console.log("SE BORRA");
            
               
                
            }

            

        });
            
       
        container.appendChild(  task_actual);

        });

       

    }



    bar_project(){
        const item_project= document.createElement("div");
        const i= document.createElement("i");
        item_project.setAttribute("class","item-menu");
        i.setAttribute("class","fa-solid fa-hashtag icon");
        const p= document.createElement("p");
        p.textContent=this.title;
        const p_tareas =   document.createElement("p");
        p_tareas.textContent= this.tasks.length;


        item_project.appendChild(i);
        item_project.appendChild(p);
        item_project.appendChild(p_tareas);
                    



        return item_project;
    }


    


}

export default Task;
export {Project};