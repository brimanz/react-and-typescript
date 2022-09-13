import React, {useState, useRef} from 'react';
import {
  BsPlusCircle, 
  BsShieldFillCheck, 
  BsShieldFillX,
  BsTrash
} from 'react-icons/bs';


type formElement = React.FormEvent<HTMLFormElement>;
type inputElement = React.Input<HTMLInputElement>;

interface ITask {
  name: string;
  done: boolean;
}


const App = (): JSX.Element =>{

  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<inputElement>(null)

  const handleSubmit = (e: formElement): void =>{
    e.preventDefault();
    addTask(newTask);

    setNewTask("");
    taskInput.current.focus();
  }

  const addTask = (name: string): void =>{
    const newTasks: ITask[] = [...tasks, {name, done: false}];

    setTasks(newTasks);
  }

  const toggleDoneTask = (i: number): void =>{
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;

    setTasks(newTasks);
  }

  const removeTask = (i: number): void =>{
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i,1);

    setTasks(newTasks);
  }



  return(
    <div className="container p-4">
      <div className="row">
        <div className="col-6 offset-md-3">

            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <input 
                    className="form-control"
                    type="text"
                    onChange={e => setNewTask(e.target.value)}
                    value={newTask}
                    autoFocus
                    ref={taskInput}
                  />

                  <button className="btn btn-dark mt-3">
                    <BsPlusCircle
                      fontSize="2rem"
                      color="#66ff00"
                      cursor="pointer"
                    />  
                  </button>
                  
                </form>
              </div>
            </div>

            {tasks.map((t: ITask, i: number) =>(
              <div 
                className="card card-body mt-5"
                key={i}
              >
                <h2 
                  style={{textDecoration: t.done ? "line-through" : ""}}
                >
                  {t.name}
                </h2>


                <div>
                  <button 
                    className="btn btn-dark"
                    onClick={() => toggleDoneTask(i)}
                  >
                    {t.done 
                      ? 
                        <BsShieldFillCheck
                          fontSize="1.2rem"
                          color="#66ff00"
                          cursor="pointer"
                        /> 
                      : 
                        <BsShieldFillX
                          fontSize="1.2rem"
                          color="#DC281E"
                          cursor="pointer"
                        />
                    }  
                  </button>

                  <button 
                    className="btn btn-dark mx-5"
                    onClick={() => removeTask(i)}
                  >
                    <BsTrash
                      fontSize="1.2rem"
                      color="#c9d4ff"
                      cursor="pointer"
                    />
                  </button>
                </div>

              </div>
            ))}
        </div>

      </div>
    </div>

  );
}


export default App;