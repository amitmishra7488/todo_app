import React, { useState, useEffect } from 'react';
import '../Styles/todo.css'

export default function Todo() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
          return JSON.parse(savedTasks);
        }
        return [];
      });
      const [inputValue, setInputValue] = useState('');
    
      useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }, [tasks]);
    
      const handleAddTask = (event) => {
        event.preventDefault();
        if (inputValue.trim() === '') {
          return;
        }
        const newTask = {
          id: Date.now(),
          value: inputValue,
          completed: false,
        };
        setTasks([...tasks, newTask]);
        setInputValue('');
      };
    
      const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
      };
    
      const handleCompleteTask = (taskId) => {
        setTasks(
          tasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, completed: !task.completed };
            }
            return task;
          })
        );
      };
    
      const handleEditTask = (taskId, newValue) => {
        setTasks(
          tasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, value: newValue };
            }
            return task;
          })
        );
      };
    
      const incompleteTasks = tasks.filter((task) => !task.completed);
    
      return (
        <div className="container">
          <h1>To-Do List</h1>
          <form onSubmit={handleAddTask}>
            <input
              type="text"
              placeholder="Add a task..."
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
            <button type="submit">Add</button>
          </form>
          <p>{incompleteTasks.length} tasks remaining</p>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCompleteTask(task.id)}
                />
                {task.completed ? (
                  <del>{task.value}</del>
                ) : (
                  <span>{task.value}</span>
                )}
                <div>
                  <button className='edit-btn' onClick={() => handleEditTask(task.id, prompt('Edit task', task.value))}>
                    Edit
                  </button>
                  <button className='delete-btn' onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
}
