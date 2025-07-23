import React, { useState, useEffect } from 'react';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('/api/todos')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  const addTodo = () => {
    fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task }),
    })
      .then(res => res.json())
      .then(newTask => {
        setTodos([...todos, newTask]);
        setTask('');
      });
  };

  return (
    <div>
      <h1>📝 MERN TODO App</h1>
      <input value={task} onChange={e => setTask(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;