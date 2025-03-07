import {useState} from 'react'

import '../styles/tasklist.scss'

import {FiCheckSquare, FiTrash} from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (!newTaskTitle) return;

    const newTask: Task = {
      id: Math.floor(Math.random() * 9000000),
      title: newTaskTitle,
      isComplete: false,
    };

    setTasks(oldTasks => [...oldTasks, newTask])
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {
    const completedTask = tasks.map((task: Task) => {
      if (task.id === id) {
        return {
          ...task,
          isComplete: !task.isComplete
        }
      }

      return task
    })

    setTasks(completedTask)
  }

  function handleRemoveTask(id: number) {
    const destroyedTasks: Task[] = tasks.filter((task: Task) => task.id !== id);

    setTasks(destroyedTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}