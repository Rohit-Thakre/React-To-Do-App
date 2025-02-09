import { useState, useEffect } from "react";
import "./Todo.css";

function Todo() {
  const [todos, setTodos] = useState([
    "Read a book",
    "Walk the dog",
    "🏋️ Hit the gym (Chest & Triceps Day)",
    "📚 Review SQL queries for shift-wise data",
    "🔍 Debug Celery task scheduling",
    "🎸 Learn the intro of 'Hotel California' on guitar",
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    document.title = `Todo List (${todos.length} tasks)`;
  }, [todos]); // Updates when tasks change

  const handleInputChange = (e) => setInput(e.target.value);

  const addTask = () => {
    if (!input.trim()) return;
    setTodos([...todos, input]);
    setInput("");
  };

  const deleteTask = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const moveTask = (index, direction) => {
    const newTodos = [...todos];
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= newTodos.length) return;
    [newTodos[index], newTodos[swapIndex]] = [
      newTodos[swapIndex],
      newTodos[index],
    ];
    setTodos(newTodos);
  };

  return (
    <div className="warper">
      <div className="todo-container">
        <h2 className="todo-title">Todo List</h2>
        <div className="todo-input-container">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter a task..."
            className="todo-input"
          />
          <button onClick={addTask} className="btn btn-add">
            Add Task
          </button>
        </div>
        <ul className="todo-list">
          {todos.map((task, index) => (
            <li key={index} className="todo-item">
              <span className="todo-text">{task}</span>
              <div className="todo-actions">
                <button
                  onClick={() => moveTask(index, -1)}
                  className="btn btn-move"
                >
                  ⬆
                </button>
                <button
                  onClick={() => moveTask(index, 1)}
                  className="btn btn-move"
                >
                  ⬇
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="btn btn-delete"
                >
                  ✖
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
