import "./styles.css"
import Task,{Project} from "./task"
import {format,compareAsc} from "date-fns"
import '@fortawesome/fontawesome-free/css/all.min.css';









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