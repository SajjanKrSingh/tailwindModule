import React, { useState } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([
    { title: 'gym', completed: false },
    { title: 'lunch', completed: false },
    { title: 'meds', completed: true },
    { title: 'cardio', completed: false }
  ]);

  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('low');
  const [selectedTitle, setSelectedTitle] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() === '') {
      return;
    }

    const newTaskObj = {
      title: newTask,
      completed: false,
      priority: priority
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask('');
    setPriority('low');
  };

  const handleToggle = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDelete = () => {
    const filteredTasks = tasks.filter((task) => task.title !== selectedTitle);
    setTasks(filteredTasks);
    setSelectedTitle('');
  };

  return (
    <>
      <form onSubmit={(e) => { e.preventDefault(); handleAddTask(); }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task"
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
      <select
        value={selectedTitle}
        onChange={(e) => setSelectedTitle(e.target.value)}
      >
        <option value="">Select title to delete</option>
        {tasks.map((task, index) => (
          <option key={index} value={task.title}>
            {task.title}
          </option>
        ))}
      </select>
      <button onClick={handleDelete}>Delete Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(index)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title} - Priority: {task.priority}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
