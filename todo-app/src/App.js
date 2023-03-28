import { useEffect, useState } from 'react';
import './App.css';
import Task from './Task';
import TaskForm from './TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);

  //use effect
  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    setTasks(tasks);
  }, []);

  function addTask(name) {
    setTasks(prev => {
      return [...prev, { name: name, done: false }];
    });
  }

  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev => {
      const newTask = [...prev];
      newTask[taskIndex].done = newDone;
      return newTask;
    })
  }

  function deleteTasks(indexToRemove) {
    setTasks(prev => {
      return prev.filter((taskObject, index) => index !== indexToRemove)
    })
  }

  function renameTasks(index, newName) {
    setTasks(prev => {
      const newTask = [...prev]
      newTask[index].name = newName;
      return newTask;
    })
  }

  function getMessage() {

    const percentage = completed / total * 100;
    if (percentage === 0) return 'Complete at least one 👍';
    if (percentage === 100) return 'Nice job for today 👌';
    return 'Keep it going 💪';
  }

  const completed = tasks.filter(t => t.done).length;
  const total = tasks.length;

  return (
    <main>
      <h1>{completed}/{total} Completed</h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTask} />
      {tasks.map((task, index) => (
        <Task {...task}
          onTrash={() => deleteTasks(index)}
          onRename={(newTask) => renameTasks(index, newTask)}
          onToggle={done => updateTaskDone(index, done)} />))}
    </main>
  );
}

export default App;
