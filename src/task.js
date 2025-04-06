import {format} from "date-fns"

class Task{

    constructor(title,description,dueDate,priority,notes){
        this._title=title;
        this._description=description;
        this._dueDate=format(dueDate,"MMMM dd, yyyy");
        this._priority=priority;
        this._notes=notes;
        this._checklist=[];
        this._isFinished=false;
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



}




class Project{

    constructor(){
        this._tasks=[];
    }


    get tasks(){
        return this._tasks;
    }

    addTask(task){
        this._tasks.push(task);
    }

    removeTask(title){
        const id = this._tasks.findIndex(u=>u.title==title);
        this._tasks.splice(id,1);
    }

    findTask(title){
     
        return  this._tasks.find(u=>u.title==title);
    }


    isFinished(){

      return  this._tasks.every(e=>{
               return e.isFinished==true;
        });
        
    }


    


}

export default Task;
export {Project};